#!/usr/bin/env python3
"""
Test screenshot functionality directly.
Run this to diagnose screenshot service issues.
"""

import asyncio
import sys
from pathlib import Path

# Add parent directory to path to import main
sys.path.insert(0, str(Path(__file__).parent.parent))

async def test_screenshot():
    """Test screenshot functionality"""
    print("=" * 60)
    print("Screenshot Service Test")
    print("=" * 60)
    
    try:
        from api.main import take_screenshots
        
        # Test URL
        test_url = "https://stripe.com/pricing"
        print(f"\nTesting screenshot for: {test_url}")
        print("This may take 30-60 seconds...\n")
        
        screenshots = await take_screenshots(test_url)
        
        print("\n" + "=" * 60)
        print("Results:")
        print("=" * 60)
        
        if screenshots:
            print(f"[OK] Screenshots dict keys: {list(screenshots.keys())}")
            
            if "desktop" in screenshots:
                desktop_len = len(screenshots["desktop"])
                print(f"[OK] Desktop screenshot: {desktop_len} characters")
                print(f"     Preview: {screenshots['desktop'][:50]}...")
            else:
                print("[ERROR] Desktop screenshot missing")
            
            if "mobile" in screenshots:
                mobile_len = len(screenshots["mobile"])
                print(f"[OK] Mobile screenshot: {mobile_len} characters")
                print(f"     Preview: {screenshots['mobile'][:50]}...")
            else:
                print("[ERROR] Mobile screenshot missing")
            
            if "desktop" in screenshots and "mobile" in screenshots:
                print("\n[SUCCESS] Both screenshots captured successfully!")
                return True
            else:
                print("\n[WARNING] Some screenshots are missing")
                return False
        else:
            print("[ERROR] Screenshots dict is empty")
            print("Check the error messages above for details")
            return False
            
    except ImportError as e:
        print(f"[ERROR] Import error: {str(e)}")
        print("Make sure you're running from the project root")
        return False
    except Exception as e:
        print(f"[ERROR] Test failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = asyncio.run(test_screenshot())
    sys.exit(0 if success else 1)















