# Specification

## Summary
**Goal:** Build APNI DUKAAN, a mobile-first local shop discovery app where customers can browse and find local shops, and sellers can register their digital shop profile.

**Planned changes:**
- Backend actor storing shop profiles with fields: shopId, ownerName, shopName, category, description, address, city, phoneNumber, whatsappNumber, openingHours, imageUrl, createdAt; with functions: listShops(), getShop(id), searchShops(category, city), registerShop()
- Welcome/Home screen displaying the APNI DUKAAN logo, tagline "Har Dukan Online", and two CTA buttons: "Find a Shop" and "Register Your Shop"
- Shop Listings page showing all shops as cards (shop name, category, city, phone), with real-time search bar and category filter dropdown; tapping a card navigates to the detail page
- Shop Detail page displaying full shop profile (all fields), tappable phone (tel:) and WhatsApp (wa.me) links, and a back button
- Multi-step Seller Registration form (3 steps): Step 1 Basic Info, Step 2 Location & Contact, Step 3 Description & Review; with progress indicator, back navigation, per-step validation, and a success confirmation screen showing the new shop ID
- Consistent visual theme using green (#2EBD59) and blue (#1A56B0) brand colors, white backgrounds, rounded cards, bold sans-serif typography, logo in header on inner pages, fully usable at 375px width

**User-visible outcome:** Users can open the app, browse and search local shop listings, view full shop details with direct call/WhatsApp links, and shop owners can register their shop via a guided multi-step form and receive a shop ID confirmation.
