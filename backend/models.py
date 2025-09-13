from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

# Enums
class BookingStatus(str, Enum):
    NEW = "new"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class UserRole(str, Enum):
    ADMIN = "admin"
    MODERATOR = "moderator"

# Base model for MongoDB documents
class MongoModel(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True

# Site Information Model
class SiteInfo(MongoModel):
    name: str = "Ферма ЛуЛу"
    location: str = "в Космакова" 
    distance: str = "всего 30 км от Екатеринбурга"
    phone: str = "+7 (343) 379-42-98"
    email: EmailStr = "info@alpaca-lulu.ru"
    address: str = "ул. Свободы, 28, д. Космакова"
    description: str = "Полезное семейное развлечение на свежем воздухе и в любую погоду"
    working_hours: str = "Ежедневно с 10:00 до 18:00"
    social_media: Dict[str, str] = Field(default_factory=dict)
    seo_keywords: List[str] = Field(default_factory=list)

class SiteInfoResponse(BaseModel):
    name: str
    location: str
    distance: str
    phone: str
    email: str
    address: str
    description: str
    working_hours: str
    social_media: Dict[str, str]

# Service Model
class Service(MongoModel):
    title: str
    slug: str
    description: str
    price: str
    image: str
    content: Optional[str] = None
    duration: Optional[str] = None
    max_people: Optional[int] = None
    is_active: bool = True
    order_index: int = 0
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: List[str] = Field(default_factory=list)

class ServiceCreate(BaseModel):
    title: str
    slug: str
    description: str
    price: str
    image: str
    content: Optional[str] = None
    duration: Optional[str] = None
    max_people: Optional[int] = None
    is_active: bool = True
    order_index: int = 0

class ServiceResponse(BaseModel):
    id: str
    title: str
    slug: str
    description: str
    price: str
    image: str
    content: Optional[str]
    duration: Optional[str]
    max_people: Optional[int]
    is_active: bool

# Blog Post Model  
class BlogPost(MongoModel):
    title: str
    slug: str
    excerpt: str
    content: str
    author: str = "Команда ЛуЛу"
    publish_date: datetime = Field(default_factory=datetime.utcnow)
    is_published: bool = True
    tags: List[str] = Field(default_factory=list)
    image: str
    views: int = 0
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: List[str] = Field(default_factory=list)

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    author: str = "Команда ЛуЛу"
    tags: List[str] = Field(default_factory=list)
    image: str
    is_published: bool = True

class BlogPostResponse(BaseModel):
    id: str
    title: str
    slug: str
    excerpt: str
    content: str
    author: str
    publish_date: datetime
    tags: List[str]
    image: str
    views: int

# Review Model
class Review(MongoModel):
    name: str
    email: Optional[EmailStr] = None
    text: str
    rating: int = Field(ge=1, le=5)
    date: datetime = Field(default_factory=datetime.utcnow)
    is_approved: bool = False
    is_featured: bool = False
    response: Optional[str] = None

class ReviewCreate(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    text: str
    rating: int = Field(ge=1, le=5)

class ReviewResponse(BaseModel):
    id: str
    name: str
    text: str
    rating: int
    date: datetime
    response: Optional[str]

# News Model
class News(MongoModel):
    title: str
    excerpt: str
    content: str
    image: str
    publish_date: datetime = Field(default_factory=datetime.utcnow)
    is_published: bool = True
    author: str = "Администрация фермы"

class NewsCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    image: str
    is_published: bool = True

class NewsResponse(BaseModel):
    id: str
    title: str
    excerpt: str
    content: str
    image: str
    publish_date: datetime

# Gallery Model
class Gallery(MongoModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image: str
    alt_text: str
    order_index: int = 0
    is_active: bool = True

class GalleryCreate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image: str
    alt_text: str
    order_index: int = 0

class GalleryResponse(BaseModel):
    id: str
    title: Optional[str]
    description: Optional[str]
    image: str
    alt_text: str

# Booking Model
class Booking(MongoModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    message: Optional[str] = None
    service_id: Optional[str] = None
    preferred_date: Optional[datetime] = None
    people_count: Optional[int] = None
    status: BookingStatus = BookingStatus.NEW
    admin_notes: Optional[str] = None

class BookingCreate(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    message: Optional[str] = None
    service_id: Optional[str] = None
    preferred_date: Optional[datetime] = None
    people_count: Optional[int] = None

class BookingResponse(BaseModel):
    id: str
    name: str
    phone: str
    email: Optional[str]
    message: Optional[str]
    status: BookingStatus
    created_at: datetime

# User Model (Admin)
class User(MongoModel):
    username: str
    email: EmailStr
    password_hash: str
    full_name: str
    role: UserRole = UserRole.ADMIN
    is_active: bool = True
    last_login: Optional[datetime] = None

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    full_name: str
    role: UserRole = UserRole.ADMIN

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    full_name: str
    role: UserRole
    last_login: Optional[datetime]

# Navigation Menu Model
class MenuItem(BaseModel):
    id: int
    title: str
    path: str
    is_dropdown: bool = False
    dropdown_items: Optional[List[Dict[str, str]]] = None
    order_index: int = 0
    is_active: bool = True

class MenuResponse(BaseModel):
    items: List[MenuItem]

# Statistics Model (for admin dashboard)
class Statistics(BaseModel):
    total_bookings: int = 0
    pending_bookings: int = 0
    total_reviews: int = 0
    pending_reviews: int = 0
    total_services: int = 0
    total_blog_posts: int = 0
    total_gallery_images: int = 0