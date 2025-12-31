# راهنمای استفاده از کامپوننت‌های اسکرین‌شات

این مستندات نحوه استفاده از کامپوننت‌های نمایش اسکرین‌شات را توضیح می‌دهد.

## کامپوننت‌های موجود

### 1. `ScreenshotDisplay` - کامپوننت اصلی (توصیه می‌شود)

این کامپوننت می‌تواند اسکرین‌شات‌ها را از بک‌اند دریافت کند و به صورت خودکار نمایش دهد.

```tsx
import ScreenshotDisplay from "@/components/ScreenshotDisplay";

// استفاده ساده - دریافت خودکار از بک‌اند
<ScreenshotDisplay 
  url="https://example.com"
  autoFetch={true}
  title="اسکرین‌شات‌های صفحه"
/>

// استفاده با اسکرین‌شات‌های آماده
<ScreenshotDisplay 
  desktop={desktopScreenshot}
  mobile={mobileScreenshot}
  title="پیش‌نمایش صفحه"
/>

// با callback برای دریافت نتیجه
<ScreenshotDisplay 
  url="https://example.com"
  autoFetch={true}
  onScreenshotsFetched={(screenshots) => {
    console.log("Desktop:", screenshots.desktop);
    console.log("Mobile:", screenshots.mobile);
  }}
/>
```

### 2. `DualScreenshotView` - نمایش ساده

برای نمایش اسکرین‌شات‌های آماده (بدون دریافت از بک‌اند).

```tsx
import DualScreenshotView from "@/components/DualScreenshotView";

<DualScreenshotView
  desktop={desktopScreenshot}
  mobile={mobileScreenshot}
  title="پیش‌نمایش"
/>
```

### 3. `ScreenshotPreviewSectionWrapper` - با جزئیات بیشتر

برای نمایش با اطلاعات اضافی (evidence, status, errors).

```tsx
import { ScreenshotPreviewSectionWrapper } from "@/components/ScreenshotPreviewSection";

<ScreenshotPreviewSectionWrapper
  desktop={desktopScreenshot}
  mobile={mobileScreenshot}
  desktopEvidence={desktopEvidence}
  mobileEvidence={mobileEvidence}
  desktopStatus="ok"
  mobileStatus="ok"
/>
```

## ویژگی‌ها

### ✅ Responsive Design
- در موبایل: اسکرین‌شات‌ها به صورت عمودی نمایش داده می‌شوند
- در دسکتاپ: اسکرین‌شات‌ها کنار هم نمایش داده می‌شوند

### ✅ پشتیبانی از فرمت‌های مختلف
- Base64 data URLs (`data:image/png;base64,...`)
- Relative URLs (`/api/debug_shots/image.png`)
- Absolute URLs (`https://example.com/image.png`)
- Object format از بک‌اند (`{ aboveFold: "...", url: "..." }`)

### ✅ حالت‌های مختلف
- Loading state: نمایش اسپینر در هنگام دریافت
- Error state: نمایش خطا با امکان تلاش مجدد
- Success state: نمایش اسکرین‌شات‌ها

## مثال کامل

```tsx
"use client";

import { useState } from "react";
import ScreenshotDisplay from "@/components/ScreenshotDisplay";

export default function MyPage() {
  const [url, setUrl] = useState("");

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="آدرس صفحه را وارد کنید"
      />
      
      {url && (
        <ScreenshotDisplay
          url={url}
          autoFetch={true}
          title="اسکرین‌شات‌های صفحه"
          onScreenshotsFetched={(screenshots) => {
            console.log("اسکرین‌شات‌ها دریافت شدند:", screenshots);
          }}
        />
      )}
    </div>
  );
}
```

## پشتیبانی از بک‌اند

کامپوننت‌ها از endpoint زیر استفاده می‌کنند:
- `/api/brain/decision-engine/report-from-url`

این endpoint به بک‌اند FastAPI متصل می‌شود که اسکرین‌شات‌ها را برمی‌گرداند.

### فرمت پاسخ بک‌اند

```json
{
  "screenshots": {
    "desktop": {
      "aboveFold": "data:image/png;base64,..."
    },
    "mobile": {
      "aboveFold": "data:image/png;base64,..."
    }
  }
}
```

یا فرمت قدیمی:
```json
{
  "screenshot": {
    "desktop": "data:image/png;base64,...",
    "mobile": "data:image/png;base64,..."
  }
}
```















