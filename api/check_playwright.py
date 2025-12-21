#!/usr/bin/env python3
"""
Check if Playwright is properly installed and configured.
Run this script to diagnose screenshot service issues.
"""

import sys

def check_playwright():
    print("=" * 60)
    print("Playwright Installation Check")
    print("=" * 60)
    
    # Check 1: Import playwright
    print("\n1. Checking Playwright package installation...")
    try:
        import playwright
        # Try to get version from package metadata
        try:
            import importlib.metadata
            version = importlib.metadata.version('playwright')
            print(f"   [OK] Playwright package found: version {version}")
        except:
            print("   [OK] Playwright package found")
    except ImportError:
        print("   [ERROR] Playwright package NOT installed")
        print("   Solution: pip install playwright")
        return False
    
    # Check 2: Check if browsers are installed
    print("\n2. Checking Chromium browser installation...")
    try:
        from playwright.sync_api import sync_playwright
        with sync_playwright() as p:
            try:
                browser = p.chromium.launch(headless=True)
                print("   [OK] Chromium browser is installed and working")
                browser.close()
            except Exception as e:
                error_msg = str(e)
                if "Executable doesn't exist" in error_msg or "browser" in error_msg.lower():
                    print("   [ERROR] Chromium browser NOT installed")
                    print("   Solution: playwright install chromium")
                    return False
                else:
                    print(f"   [WARNING] Chromium launch error: {error_msg}")
                    return False
    except Exception as e:
        print(f"   [ERROR] Error checking Chromium: {str(e)}")
        return False
    
    # Check 3: Test async API
    print("\n3. Testing async Playwright API...")
    try:
        from playwright.async_api import async_playwright
        print("   [OK] Async Playwright API is available")
    except ImportError:
        print("   [ERROR] Async Playwright API NOT available")
        return False
    
    print("\n" + "=" * 60)
    print("[SUCCESS] All checks passed! Playwright is ready to use.")
    print("=" * 60)
    return True

if __name__ == "__main__":
    success = check_playwright()
    sys.exit(0 if success else 1)

