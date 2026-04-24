import { any } from "zod";


export const generateShopHtml = (apiData:any) => {
  const brand = apiData.websitesbrands[0];

  // Logic to handle theme-based returns
  if (brand.theme !== "default") {
    return `<div>Theme ${brand.theme} not supported yet.</div>`;
  }

  // Map Social Links to HTML
  const socialLinksHtml = brand.shoplinks.map((social:any) => {
    const platform = social.link.includes('facebook') ? 'Facebook' : 
                     social.link.includes('instagram') ? 'Instagram' : 'Social';
    return `<li><a href="${social.link}" class="hover:text-white transition">${platform}</a></li>`;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brand.shopname} | ${brand.shopdescription}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .brand-font { font-family: 'Playfair Display', serif; }
    </style>
</head>
<body class="bg-stone-50 text-stone-900">

    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <img src="${brand.shoplogo}" alt="${brand.shopname} Logo" class="w-10 h-10 rounded-full object-cover">
                <span class="text-2xl font-bold tracking-tight brand-font">${brand.shopname}</span>
            </div>
            <div class="hidden md:flex gap-8 font-medium text-sm uppercase tracking-widest">
                <a href="#" class="hover:text-amber-700 transition">Home</a>
                <a href="#products" class="hover:text-amber-700 transition">Products</a>
                <a href="#about" class="hover:text-amber-700 transition">Contact</a>
            </div>
            <div class="flex items-center gap-6">
                <button class="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </button>
            </div>
        </div>
    </nav>

    <header class="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img src="${brand.shophomepageimg}" alt="Hero Banner" class="absolute inset-0 w-full h-full object-cover">
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="relative text-center text-white px-6">
            <h1 class="text-5xl md:text-7xl mb-4 brand-font">${brand.shopname}</h1>
            <p class="text-lg md:text-xl max-w-2xl mx-auto font-light opacity-90">
                ${brand.shopdescription}
            </p>
            <button class="mt-8 px-8 py-4 bg-white text-stone-900 font-bold uppercase tracking-widest hover:bg-stone-100 transition">
                Explore Collection
            </button>
        </div>
    </header>

    <main id="products" class="max-w-7xl mx-auto px-6 py-24">
        <div class="flex justify-between items-end mb-12">
            <div>
                <h2 class="text-3xl font-bold brand-font">Our Products</h2>
                <p class="text-stone-500 mt-2">Available now in ${brand.city}, ${brand.country}.</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            ${brand.shopProducts.length > 0 ? '' : '<p class="text-stone-400 italic">New products coming soon...</p>'}
        </div>
    </main>

    <footer class="bg-stone-900 text-stone-300 py-20 px-6">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div class="col-span-1 md:col-span-2">
                <h3 class="text-white text-2xl font-bold brand-font mb-6">${brand.shopname}</h3>
                <p class="max-w-xs text-stone-400 leading-relaxed">
                    ${brand.shopdescription}
                </p>
                <div class="mt-8 space-y-2">
                    <p class="flex items-center gap-3"><span class="text-white font-medium">Email:</span> ${brand.shopemail}</p>
                    <p class="flex items-center gap-3"><span class="text-white font-medium">Phone:</span> ${brand.phone}</p>
                    <p class="flex items-center gap-3 text-sm opacity-80 leading-relaxed">
                        ${brand.shopadress}<br>${brand.mapLocation}<br>${brand.city}, ${brand.country}
                    </p>
                </div>
            </div>
            
            <div>
                <h4 class="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Navigation</h4>
                <ul class="space-y-4 text-sm">
                    <li><a href="#" class="hover:text-white transition">Home</a></li>
                    <li><a href="#" class="hover:text-white transition">Privacy Policy</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Socials</h4>
                <ul class="space-y-4 text-sm">
                    ${socialLinksHtml}
                </ul>
            </div>
        </div>
        <div class="max-w-7xl mx-auto border-t border-stone-800 mt-20 pt-8 text-xs text-stone-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 ${brand.shopname}. All Rights Reserved.</p>
            <div class="flex gap-6">
                <span>Theme: ${brand.theme.charAt(0).toUpperCase() + brand.theme.slice(1)}</span>
            </div>
        </div>
    </footer>

</body>
</html>`;
};