"""
Test script for DeepScan endpoint
"""
import requests
import json

API_URL = "http://127.0.0.1:8000/brain/deepscan"

def test_deepscan():
    """Test the DeepScan endpoint"""
    print("=" * 60)
    print("Testing DeepScan Endpoint")
    print("=" * 60)
    print()
    
    test_data = {
        "industry": "Beauty Clinic",
        "city": "Istanbul",
        "audience": "Tourists and locals aged 25-45, interested in aesthetic treatments",
        "analysis": "Analyze behavioral patterns, motivations, barriers, and triggers for this audience"
    }
    
    print("Request:")
    print(json.dumps(test_data, indent=2))
    print()
    print("Sending request...")
    
    try:
        response = requests.post(
            API_URL,
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=60
        )
        
        print(f"Status Code: {response.status_code}")
        print()
        
        if response.status_code == 200:
            result = response.json()
            print("=" * 60)
            print("Response:")
            print("=" * 60)
            print(f"Summary: {result.get('summary', 'N/A')}")
            print()
            print(f"Segments ({len(result.get('segments', []))}):")
            for i, segment in enumerate(result.get('segments', []), 1):
                print(f"  {i}. {segment}")
            print()
            print(f"Barriers ({len(result.get('barriers', []))}):")
            for i, barrier in enumerate(result.get('barriers', []), 1):
                print(f"  {i}. {barrier}")
            print()
            print(f"Triggers ({len(result.get('triggers', []))}):")
            for i, trigger in enumerate(result.get('triggers', []), 1):
                print(f"  {i}. {trigger}")
            print()
            print(f"Recommendations ({len(result.get('recommendations', []))}):")
            for i, rec in enumerate(result.get('recommendations', []), 1):
                print(f"  {i}. {rec}")
            print()
            print("=" * 60)
            print("✅ Test passed!")
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server")
        print("Make sure the server is running:")
        print("  uvicorn api.main:app --reload")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_deepscan()

