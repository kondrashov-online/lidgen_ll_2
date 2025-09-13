from typing import List, Optional, Dict, Any
from datetime import datetime
from models import *
from database import get_collection, COLLECTIONS
from bson import ObjectId
import uuid

class BaseService:
    """Base service class with common CRUD operations"""
    
    def __init__(self, collection_name: str):
        self.collection_name = collection_name
    
    async def get_collection(self):
        return await get_collection(self.collection_name)
    
    async def create(self, data: dict) -> str:
        """Create new document"""
        collection = await self.get_collection()
        data["_id"] = str(uuid.uuid4())
        data["created_at"] = datetime.utcnow()
        data["updated_at"] = datetime.utcnow()
        
        result = await collection.insert_one(data)
        return data["_id"]
    
    async def get_by_id(self, doc_id: str) -> Optional[Dict]:
        """Get document by ID"""
        collection = await self.get_collection()
        doc = await collection.find_one({"_id": doc_id})
        if doc:
            doc["id"] = doc["_id"]
        return doc
    
    async def get_all(self, filter_dict: Dict = None, limit: int = None, skip: int = 0) -> List[Dict]:
        """Get all documents with optional filtering"""
        collection = await self.get_collection()
        query = filter_dict or {}
        
        cursor = collection.find(query).skip(skip)
        if limit:
            cursor = cursor.limit(limit)
            
        docs = await cursor.to_list(length=None)
        for doc in docs:
            doc["id"] = doc["_id"]
        return docs
    
    async def update(self, doc_id: str, data: dict) -> bool:
        """Update document"""
        collection = await self.get_collection()
        data["updated_at"] = datetime.utcnow()
        
        result = await collection.update_one(
            {"_id": doc_id},
            {"$set": data}
        )
        return result.modified_count > 0
    
    async def delete(self, doc_id: str) -> bool:
        """Delete document"""
        collection = await self.get_collection()
        result = await collection.delete_one({"_id": doc_id})
        return result.deleted_count > 0

class SiteInfoService(BaseService):
    def __init__(self):
        super().__init__(COLLECTIONS['site_info'])
    
    async def get_site_info(self) -> Optional[SiteInfoResponse]:
        """Get site information"""
        docs = await self.get_all()
        if docs:
            info = docs[0]
            return SiteInfoResponse(
                name=info.get('name', 'Ферма ЛуЛу'),
                location=info.get('location', 'в Космакова'),
                distance=info.get('distance', 'всего 30 км от Екатеринбурга'),
                phone=info.get('phone', '+7 (343) 379-42-98'),
                email=info.get('email', 'info@alpaca-lulu.ru'),
                address=info.get('address', 'ул. Свободы, 28, д. Космакова'),
                description=info.get('description', 'Полезное семейное развлечение на свежем воздухе и в любую погоду'),
                working_hours=info.get('working_hours', 'Ежедневно с 10:00 до 18:00'),
                social_media=info.get('social_media', {})
            )
        else:
            # Create default site info if none exists
            default_info = SiteInfo()
            await self.create(default_info.dict())
            return SiteInfoResponse(**default_info.dict())

class ServicesService(BaseService):
    def __init__(self):
        super().__init__(COLLECTIONS['services'])
    
    async def get_active_services(self) -> List[ServiceResponse]:
        """Get all active services"""
        services = await self.get_all({"is_active": True})
        # Sort by order_index
        services.sort(key=lambda x: x.get('order_index', 0))
        
        return [ServiceResponse(**service) for service in services]
    
    async def get_service_by_slug(self, slug: str) -> Optional[ServiceResponse]:
        """Get service by slug"""
        collection = await self.get_collection()
        service = await collection.find_one({"slug": slug, "is_active": True})
        if service:
            service["id"] = service["_id"]
            return ServiceResponse(**service)
        return None

class BlogService(BaseService):
    def __init__(self):
        super().__init__(COLLECTIONS['blog_posts'])
    
    async def get_published_posts(self, limit: int = None, skip: int = 0) -> List[BlogPostResponse]:
        """Get published blog posts"""
        posts = await self.get_all({"is_published": True}, limit=limit, skip=skip)
        # Sort by publish_date descending
        posts.sort(key=lambda x: x.get('publish_date', datetime.min), reverse=True)
        
        return [BlogPostResponse(**post) for post in posts]
    
    async def get_post_by_slug(self, slug: str) -> Optional[BlogPostResponse]:
        """Get blog post by slug"""
        collection = await self.get_collection()
        post = await collection.find_one({"slug": slug, "is_published": True})
        if post:
            post["id"] = post["_id"]
            # Increment views
            await collection.update_one(
                {"_id": post["_id"]},
                {"$inc": {"views": 1}}
            )
            return BlogPostResponse(**post)
        return None

class ReviewsService(BaseService):
    def __init__(self):
        super().__init__(COLLECTIONS['reviews'])
    
    async def get_approved_reviews(self, limit: int = None) -> List[ReviewResponse]:
        """Get approved reviews"""
        reviews = await self.get_all({"is_approved": True}, limit=limit)
        # Sort by date descending
        reviews.sort(key=lambda x: x.get('date', datetime.min), reverse=True)
        
        return [ReviewResponse(**review) for review in reviews]
    
    async def get_pending_reviews(self) -> List[ReviewResponse]:
        """Get reviews pending approval"""
        reviews = await self.get_all({"is_approved": False})
        reviews.sort(key=lambda x: x.get('created_at', datetime.min), reverse=True)
        
        return [ReviewResponse(**review) for review in reviews]

class NewsService(BaseService):
    def __init__(self):
        super().__init__(COLLECTIONS['news'])
    
    async def get_published_news(self, limit: int = None) -> List[NewsResponse]:
        """Get published news"""
        news = await self.get_all({"is_published": True}, limit=limit)
        # Sort by publish_date descending
        news.sort(key=lambda x: x.get('publish_date', datetime.min), reverse=True)
        
        return [NewsResponse(**news_item) for news_item in news]

class GalleryService(BaseService):
    def __init__(self):
        super().__init__(COLLECTIONS['gallery'])
    
    async def get_active_images(self) -> List[GalleryResponse]:
        """Get active gallery images"""
        images = await self.get_all({"is_active": True})
        # Sort by order_index
        images.sort(key=lambda x: x.get('order_index', 0))
        
        return [GalleryResponse(**image) for image in images]

class BookingService(BaseService):
    def __init__(self):
        super().__init__(COLLECTIONS['bookings'])
    
    async def create_booking(self, booking_data: BookingCreate) -> str:
        """Create new booking"""
        booking = Booking(**booking_data.dict())
        booking_dict = booking.dict()
        return await self.create(booking_dict)
    
    async def get_bookings_by_status(self, status: BookingStatus = None) -> List[BookingResponse]:
        """Get bookings by status"""
        query = {"status": status} if status else {}
        bookings = await self.get_all(query)
        bookings.sort(key=lambda x: x.get('created_at', datetime.min), reverse=True)
        
        return [BookingResponse(**booking) for booking in bookings]
    
    async def update_booking_status(self, booking_id: str, status: BookingStatus, admin_notes: str = None) -> bool:
        """Update booking status"""
        update_data = {"status": status}
        if admin_notes:
            update_data["admin_notes"] = admin_notes
            
        return await self.update(booking_id, update_data)

class StatsService:
    """Service for admin statistics"""
    
    async def get_dashboard_stats(self) -> Statistics:
        """Get dashboard statistics"""
        bookings_service = BookingService()
        reviews_service = ReviewsService()
        services_service = ServicesService()
        blog_service = BlogService()
        gallery_service = GalleryService()
        
        # Get counts
        total_bookings = len(await bookings_service.get_all())
        pending_bookings = len(await bookings_service.get_bookings_by_status(BookingStatus.NEW))
        
        total_reviews = len(await reviews_service.get_all())
        pending_reviews = len(await reviews_service.get_pending_reviews())
        
        total_services = len(await services_service.get_all())
        total_blog_posts = len(await blog_service.get_all())
        total_gallery_images = len(await gallery_service.get_all())
        
        return Statistics(
            total_bookings=total_bookings,
            pending_bookings=pending_bookings,
            total_reviews=total_reviews,
            pending_reviews=pending_reviews,
            total_services=total_services,
            total_blog_posts=total_blog_posts,
            total_gallery_images=total_gallery_images
        )

# Initialize services
site_info_service = SiteInfoService()
services_service = ServicesService()
blog_service = BlogService()
reviews_service = ReviewsService()
news_service = NewsService()
gallery_service = GalleryService()
booking_service = BookingService()
stats_service = StatsService()