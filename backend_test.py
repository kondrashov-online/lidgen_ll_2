#!/usr/bin/env python3
"""
Backend API Testing for Alpaca Farm LL
Tests all public and admin endpoints as specified in the review request
"""

import asyncio
import aiohttp
import json
import sys
from datetime import datetime
from typing import Dict, Any, Optional

# Get backend URL from frontend .env
BACKEND_URL = "https://contact-zoo-site.preview.emergentagent.com/api"

class AlpacaFarmAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = None
        self.admin_token = None
        self.test_results = []
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    def log_test(self, endpoint: str, method: str, status: str, details: str = "", response_data: Any = None):
        """Log test result"""
        result = {
            "endpoint": endpoint,
            "method": method,
            "status": status,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        
        status_icon = "✅" if status == "PASS" else "❌" if status == "FAIL" else "⚠️"
        print(f"{status_icon} {method} {endpoint} - {status}")
        if details:
            print(f"   Details: {details}")
        if status == "FAIL" and response_data:
            print(f"   Response: {response_data}")
        print()
    
    async def make_request(self, method: str, endpoint: str, data: Dict = None, headers: Dict = None) -> tuple:
        """Make HTTP request and return (status_code, response_data, error)"""
        url = f"{self.base_url}{endpoint}"
        
        try:
            if headers is None:
                headers = {}
            
            if self.admin_token and "Authorization" not in headers:
                headers["Authorization"] = f"Bearer {self.admin_token}"
            
            async with self.session.request(method, url, json=data, headers=headers) as response:
                try:
                    response_data = await response.json()
                except:
                    response_data = await response.text()
                
                return response.status, response_data, None
                
        except Exception as e:
            return 0, None, str(e)
    
    async def test_public_endpoints(self):
        """Test all public endpoints"""
        print("🔍 Testing Public Endpoints...")
        print("=" * 50)
        
        # Test root endpoint
        status, data, error = await self.make_request("GET", "/")
        if error:
            self.log_test("/", "GET", "FAIL", f"Connection error: {error}")
        elif status == 200:
            if isinstance(data, dict) and "message" in data:
                self.log_test("/", "GET", "PASS", f"Message: {data.get('message')}")
            else:
                self.log_test("/", "GET", "FAIL", "Invalid response format", data)
        else:
            self.log_test("/", "GET", "FAIL", f"HTTP {status}", data)
        
        # Test site-info endpoint
        status, data, error = await self.make_request("GET", "/site-info")
        if error:
            self.log_test("/site-info", "GET", "FAIL", f"Connection error: {error}")
        elif status == 200:
            if isinstance(data, dict) and "name" in data and "phone" in data:
                self.log_test("/site-info", "GET", "PASS", f"Site: {data.get('name')}")
            else:
                self.log_test("/site-info", "GET", "FAIL", "Invalid response format", data)
        else:
            self.log_test("/site-info", "GET", "FAIL", f"HTTP {status}", data)
        
        # Test services endpoint
        status, data, error = await self.make_request("GET", "/services")
        if error:
            self.log_test("/services", "GET", "FAIL", f"Connection error: {error}")
        elif status == 200:
            if isinstance(data, list):
                self.log_test("/services", "GET", "PASS", f"Found {len(data)} services")
            else:
                self.log_test("/services", "GET", "FAIL", "Expected list response", data)
        else:
            self.log_test("/services", "GET", "FAIL", f"HTTP {status}", data)
        
        # Test reviews endpoint
        status, data, error = await self.make_request("GET", "/reviews")
        if error:
            self.log_test("/reviews", "GET", "FAIL", f"Connection error: {error}")
        elif status == 200:
            if isinstance(data, list):
                self.log_test("/reviews", "GET", "PASS", f"Found {len(data)} reviews")
            else:
                self.log_test("/reviews", "GET", "FAIL", "Expected list response", data)
        else:
            self.log_test("/reviews", "GET", "FAIL", f"HTTP {status}", data)
        
        # Test news endpoint
        status, data, error = await self.make_request("GET", "/news")
        if error:
            self.log_test("/news", "GET", "FAIL", f"Connection error: {error}")
        elif status == 200:
            if isinstance(data, list):
                self.log_test("/news", "GET", "PASS", f"Found {len(data)} news items")
            else:
                self.log_test("/news", "GET", "FAIL", "Expected list response", data)
        else:
            self.log_test("/news", "GET", "FAIL", f"HTTP {status}", data)
        
        # Test gallery endpoint
        status, data, error = await self.make_request("GET", "/gallery")
        if error:
            self.log_test("/gallery", "GET", "FAIL", f"Connection error: {error}")
        elif status == 200:
            if isinstance(data, list):
                self.log_test("/gallery", "GET", "PASS", f"Found {len(data)} gallery images")
            else:
                self.log_test("/gallery", "GET", "FAIL", "Expected list response", data)
        else:
            self.log_test("/gallery", "GET", "FAIL", f"HTTP {status}", data)
        
        # Test blog posts endpoint
        status, data, error = await self.make_request("GET", "/blog/posts")
        if error:
            self.log_test("/blog/posts", "GET", "FAIL", f"Connection error: {error}")
        elif status == 200:
            if isinstance(data, list):
                self.log_test("/blog/posts", "GET", "PASS", f"Found {len(data)} blog posts")
            else:
                self.log_test("/blog/posts", "GET", "FAIL", "Expected list response", data)
        else:
            self.log_test("/blog/posts", "GET", "FAIL", f"HTTP {status}", data)
        
        # Test booking creation endpoint
        booking_data = {
            "name": "Анна Петрова",
            "phone": "+7 (912) 345-67-89",
            "email": "anna.petrova@example.com",
            "message": "Хотим посетить ферму с детьми в выходные",
            "people_count": 4
        }
        
        status, data, error = await self.make_request("POST", "/bookings", booking_data)
        if error:
            self.log_test("/bookings", "POST", "FAIL", f"Connection error: {error}")
        elif status == 200:
            if isinstance(data, dict) and "message" in data:
                self.log_test("/bookings", "POST", "PASS", f"Booking created: {data.get('id', 'N/A')}")
            else:
                self.log_test("/bookings", "POST", "FAIL", "Invalid response format", data)
        else:
            self.log_test("/bookings", "POST", "FAIL", f"HTTP {status}", data)
    
    async def test_auth_endpoints(self):
        """Test authentication endpoints"""
        print("🔐 Testing Authentication Endpoints...")
        print("=" * 50)
        
        # Test admin login
        login_data = {
            "username": "admin",
            "password": "admin123"
        }
        
        status, data, error = await self.make_request("POST", "/auth/login", login_data)
        if error:
            self.log_test("/auth/login", "POST", "FAIL", f"Connection error: {error}")
        elif status == 200:
            if isinstance(data, dict) and "access_token" in data:
                self.admin_token = data["access_token"]
                user_info = data.get("user", {})
                self.log_test("/auth/login", "POST", "PASS", f"Logged in as: {user_info.get('username', 'N/A')}")
            else:
                self.log_test("/auth/login", "POST", "FAIL", "Invalid response format", data)
        else:
            self.log_test("/auth/login", "POST", "FAIL", f"HTTP {status}", data)
        
        # Test getting current user info (if login was successful)
        if self.admin_token:
            status, data, error = await self.make_request("GET", "/auth/me")
            if error:
                self.log_test("/auth/me", "GET", "FAIL", f"Connection error: {error}")
            elif status == 200:
                if isinstance(data, dict) and "username" in data:
                    self.log_test("/auth/me", "GET", "PASS", f"User: {data.get('username')} ({data.get('role')})")
                else:
                    self.log_test("/auth/me", "GET", "FAIL", "Invalid response format", data)
            else:
                self.log_test("/auth/me", "GET", "FAIL", f"HTTP {status}", data)
    
    async def test_admin_endpoints(self):
        """Test admin endpoints (requires authentication)"""
        print("👑 Testing Admin Endpoints...")
        print("=" * 50)
        
        if not self.admin_token:
            self.log_test("admin/*", "ALL", "SKIP", "No admin token available")
            return
        
        # Test admin stats
        status, data, error = await self.make_request("GET", "/admin/stats")
        if error:
            self.log_test("/admin/stats", "GET", "FAIL", f"Connection error: {error}")
        elif status == 200:
            if isinstance(data, dict):
                stats_info = f"Bookings: {data.get('total_bookings', 0)}, Reviews: {data.get('total_reviews', 0)}"
                self.log_test("/admin/stats", "GET", "PASS", stats_info)
            else:
                self.log_test("/admin/stats", "GET", "FAIL", "Invalid response format", data)
        else:
            self.log_test("/admin/stats", "GET", "FAIL", f"HTTP {status}", data)
        
        # Test admin services
        status, data, error = await self.make_request("GET", "/admin/services")
        if error:
            self.log_test("/admin/services", "GET", "FAIL", f"Connection error: {error}")
        elif status == 200:
            if isinstance(data, list):
                self.log_test("/admin/services", "GET", "PASS", f"Found {len(data)} services (admin view)")
            else:
                self.log_test("/admin/services", "GET", "FAIL", "Expected list response", data)
        else:
            self.log_test("/admin/services", "GET", "FAIL", f"HTTP {status}", data)
        
        # Test pending reviews
        status, data, error = await self.make_request("GET", "/admin/reviews/pending")
        if error:
            self.log_test("/admin/reviews/pending", "GET", "FAIL", f"Connection error: {error}")
        elif status == 200:
            if isinstance(data, list):
                self.log_test("/admin/reviews/pending", "GET", "PASS", f"Found {len(data)} pending reviews")
            else:
                self.log_test("/admin/reviews/pending", "GET", "FAIL", "Expected list response", data)
        else:
            self.log_test("/admin/reviews/pending", "GET", "FAIL", f"HTTP {status}", data)
    
    async def test_error_handling(self):
        """Test error handling"""
        print("🚨 Testing Error Handling...")
        print("=" * 50)
        
        # Test 404 for non-existent service
        status, data, error = await self.make_request("GET", "/services/non-existent-service")
        if status == 404:
            self.log_test("/services/non-existent", "GET", "PASS", "Correctly returns 404")
        else:
            self.log_test("/services/non-existent", "GET", "FAIL", f"Expected 404, got {status}", data)
        
        # Test 404 for non-existent blog post
        status, data, error = await self.make_request("GET", "/blog/posts/non-existent-post")
        if status == 404:
            self.log_test("/blog/posts/non-existent", "GET", "PASS", "Correctly returns 404")
        else:
            self.log_test("/blog/posts/non-existent", "GET", "FAIL", f"Expected 404, got {status}", data)
        
        # Test unauthorized access to admin endpoint
        headers = {"Authorization": "Bearer invalid-token"}
        status, data, error = await self.make_request("GET", "/admin/stats", headers=headers)
        if status == 401:
            self.log_test("/admin/stats (invalid token)", "GET", "PASS", "Correctly returns 401")
        else:
            self.log_test("/admin/stats (invalid token)", "GET", "FAIL", f"Expected 401, got {status}", data)
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([r for r in self.test_results if r["status"] == "PASS"])
        failed_tests = len([r for r in self.test_results if r["status"] == "FAIL"])
        skipped_tests = len([r for r in self.test_results if r["status"] == "SKIP"])
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"⏭️ Skipped: {skipped_tests}")
        
        if failed_tests > 0:
            print(f"\n🚨 FAILED TESTS:")
            for result in self.test_results:
                if result["status"] == "FAIL":
                    print(f"   • {result['method']} {result['endpoint']}: {result['details']}")
        
        success_rate = (passed_tests / (total_tests - skipped_tests)) * 100 if (total_tests - skipped_tests) > 0 else 0
        print(f"\n📈 Success Rate: {success_rate:.1f}%")
        
        return failed_tests == 0

async def main():
    """Main test function"""
    print("🦙 Alpaca Farm LL - Backend API Testing")
    print("=" * 60)
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Test started at: {datetime.now().isoformat()}")
    print()
    
    async with AlpacaFarmAPITester() as tester:
        # Run all test suites
        await tester.test_public_endpoints()
        await tester.test_auth_endpoints()
        await tester.test_admin_endpoints()
        await tester.test_error_handling()
        
        # Print summary
        success = tester.print_summary()
        
        return success

if __name__ == "__main__":
    try:
        success = asyncio.run(main())
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n⚠️ Test interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Test failed with error: {e}")
        sys.exit(1)