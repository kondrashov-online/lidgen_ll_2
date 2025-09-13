from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from typing import List
from datetime import datetime, timedelta

# Import our modules
from models import *
from database import connect_to_mongo, close_mongo_connection
from auth import authenticate_user, create_access_token, get_current_admin_user, create_default_admin
from services import (
    site_info_service, services_service, blog_service, reviews_service,
    news_service, gallery_service, booking_service, stats_service
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(
    title="Alpaca Farm LL API",
    description="API for Alpaca Farm LL website",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# ================================
# PUBLIC ENDPOINTS
# ================================

@api_router.get("/")
async def root():
    return {"message": "Alpaca Farm LL API", "version": "1.0.0"}

# Site Information
@api_router.get("/site-info", response_model=SiteInfoResponse)
async def get_site_info():
    """Get site information"""
    return await site_info_service.get_site_info()

# Services
@api_router.get("/services", response_model=List[ServiceResponse])
async def get_services():
    """Get all active services"""
    return await services_service.get_active_services()

@api_router.get("/services/{slug}", response_model=ServiceResponse)
async def get_service_by_slug(slug: str):
    """Get service by slug"""
    service = await services_service.get_service_by_slug(slug)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

# Blog
@api_router.get("/blog/posts", response_model=List[BlogPostResponse])
async def get_blog_posts(limit: int = 10, skip: int = 0):
    """Get published blog posts"""
    return await blog_service.get_published_posts(limit=limit, skip=skip)

@api_router.get("/blog/posts/{slug}", response_model=BlogPostResponse)
async def get_blog_post(slug: str):
    """Get blog post by slug"""
    post = await blog_service.get_post_by_slug(slug)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post

# Reviews
@api_router.get("/reviews", response_model=List[ReviewResponse])
async def get_reviews(limit: int = 20):
    """Get approved reviews"""
    return await reviews_service.get_approved_reviews(limit=limit)

@api_router.post("/reviews")
async def create_review(review: ReviewCreate):
    """Create new review (requires approval)"""
    review_dict = review.dict()
    review_id = await reviews_service.create(review_dict)
    return {"message": "Отзыв отправлен на модерацию", "id": review_id}

# News
@api_router.get("/news", response_model=List[NewsResponse])
async def get_news(limit: int = 10):
    """Get published news"""
    return await news_service.get_published_news(limit=limit)

# Gallery
@api_router.get("/gallery", response_model=List[GalleryResponse])
async def get_gallery():
    """Get gallery images"""
    return await gallery_service.get_active_images()

# Bookings
@api_router.post("/bookings")
async def create_booking(booking: BookingCreate):
    """Create new booking"""
    booking_id = await booking_service.create_booking(booking)
    return {"message": "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.", "id": booking_id}

# ================================
# AUTH ENDPOINTS
# ================================

@api_router.post("/auth/login")
async def login(user_credentials: UserLogin):
    """Admin login"""
    user = await authenticate_user(user_credentials.username, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    access_token_expires = timedelta(minutes=1440)  # 24 hours
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserResponse(
            id=user.id,
            username=user.username,
            email=user.email,
            full_name=user.full_name,
            role=user.role,
            last_login=user.last_login
        )
    }

@api_router.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: UserResponse = Depends(get_current_admin_user)):
    """Get current user information"""
    return current_user

# ================================
# ADMIN ENDPOINTS
# ================================

# Dashboard
@api_router.get("/admin/stats", response_model=Statistics)
async def get_dashboard_stats(current_user: UserResponse = Depends(get_current_admin_user)):
    """Get dashboard statistics"""
    return await stats_service.get_dashboard_stats()

# Admin Services Management
@api_router.get("/admin/services", response_model=List[ServiceResponse])
async def get_admin_services(current_user: UserResponse = Depends(get_current_admin_user)):
    """Get all services for admin"""
    return await services_service.get_all()

@api_router.post("/admin/services")
async def create_service(service: ServiceCreate, current_user: UserResponse = Depends(get_current_admin_user)):
    """Create new service"""
    service_id = await services_service.create(service.dict())
    return {"message": "Услуга создана", "id": service_id}

@api_router.put("/admin/services/{service_id}")
async def update_service(
    service_id: str, 
    service: ServiceCreate, 
    current_user: UserResponse = Depends(get_current_admin_user)
):
    """Update service"""
    success = await services_service.update(service_id, service.dict())
    if not success:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Услуга обновлена"}

@api_router.delete("/admin/services/{service_id}")
async def delete_service(service_id: str, current_user: UserResponse = Depends(get_current_admin_user)):
    """Delete service"""
    success = await services_service.delete(service_id)
    if not success:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Услуга удалена"}

# Admin Blog Management
@api_router.get("/admin/blog/posts", response_model=List[BlogPostResponse])
async def get_admin_blog_posts(current_user: UserResponse = Depends(get_current_admin_user)):
    """Get all blog posts for admin"""
    return await blog_service.get_all()

@api_router.post("/admin/blog/posts")
async def create_blog_post(post: BlogPostCreate, current_user: UserResponse = Depends(get_current_admin_user)):
    """Create new blog post"""
    post_id = await blog_service.create(post.dict())
    return {"message": "Статья создана", "id": post_id}

@api_router.put("/admin/blog/posts/{post_id}")
async def update_blog_post(
    post_id: str,
    post: BlogPostCreate,
    current_user: UserResponse = Depends(get_current_admin_user)
):
    """Update blog post"""
    success = await blog_service.update(post_id, post.dict())
    if not success:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Статья обновлена"}

@api_router.delete("/admin/blog/posts/{post_id}")
async def delete_blog_post(post_id: str, current_user: UserResponse = Depends(get_current_admin_user)):
    """Delete blog post"""
    success = await blog_service.delete(post_id)
    if not success:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Статья удалена"}

# Admin Reviews Management
@api_router.get("/admin/reviews/pending", response_model=List[ReviewResponse])
async def get_pending_reviews(current_user: UserResponse = Depends(get_current_admin_user)):
    """Get reviews pending approval"""
    return await reviews_service.get_pending_reviews()

@api_router.put("/admin/reviews/{review_id}/approve")
async def approve_review(review_id: str, current_user: UserResponse = Depends(get_current_admin_user)):
    """Approve review"""
    success = await reviews_service.update(review_id, {"is_approved": True})
    if not success:
        raise HTTPException(status_code=404, detail="Review not found")
    return {"message": "Отзыв одобрен"}

@api_router.delete("/admin/reviews/{review_id}")
async def delete_review(review_id: str, current_user: UserResponse = Depends(get_current_admin_user)):
    """Delete review"""
    success = await reviews_service.delete(review_id)
    if not success:
        raise HTTPException(status_code=404, detail="Review not found")
    return {"message": "Отзыв удален"}

# Admin Bookings Management  
@api_router.get("/admin/bookings", response_model=List[BookingResponse])
async def get_all_bookings(current_user: UserResponse = Depends(get_current_admin_user)):
    """Get all bookings"""
    return await booking_service.get_bookings_by_status()

@api_router.put("/admin/bookings/{booking_id}/status")
async def update_booking_status(
    booking_id: str,
    status: BookingStatus,
    admin_notes: str = None,
    current_user: UserResponse = Depends(get_current_admin_user)
):
    """Update booking status"""
    success = await booking_service.update_booking_status(booking_id, status, admin_notes)
    if not success:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Статус заявки обновлен"}

# Admin News Management
@api_router.post("/admin/news")
async def create_news(news: NewsCreate, current_user: UserResponse = Depends(get_current_admin_user)):
    """Create news"""
    news_id = await news_service.create(news.dict())
    return {"message": "Новость создана", "id": news_id}

@api_router.put("/admin/news/{news_id}")
async def update_news(
    news_id: str,
    news: NewsCreate,
    current_user: UserResponse = Depends(get_current_admin_user)
):
    """Update news"""
    success = await news_service.update(news_id, news.dict())
    if not success:
        raise HTTPException(status_code=404, detail="News not found")
    return {"message": "Новость обновлена"}

@api_router.delete("/admin/news/{news_id}")
async def delete_news(news_id: str, current_user: UserResponse = Depends(get_current_admin_user)):
    """Delete news"""
    success = await news_service.delete(news_id)
    if not success:
        raise HTTPException(status_code=404, detail="News not found")
    return {"message": "Новость удалена"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Events
@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()
    await create_default_admin()
    logger.info("Application started successfully")

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()
    logger.info("Application shut down successfully")
