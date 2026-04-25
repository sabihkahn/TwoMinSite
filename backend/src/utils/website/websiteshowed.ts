export const generateShopHtml = (brand: any) => {
  
  
    const webId = brand._id;

if(brand.theme == "default"){

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brand.shopname} | Official Boutique</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
    <style>
        :root {
            --premium-gold: #c5a059;
            --deep-obsidian: #121212;
        }
        body { font-family: 'Plus Jakarta Sans', sans-serif; scroll-behavior: smooth; background-color: #faf9f6; }
        .brand-font { font-family: 'Playfair Display', serif; }
        .glass { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(15px); }
        .gold-text { color: var(--premium-gold); }
        .bg-obsidian { background-color: var(--deep-obsidian); }
        [x-cloak] { display: none !important; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #c5a059; border-radius: 10px; }
    </style>
</head>
<body x-data="{ 
    selectedProduct: null,
    isCheckout: false,
    isSubmitting: false,
    webid: '${webId}',
    orderData: { name: '', phoneno: '', location: '', email: '' },
    reviewData: { name: '', message: '' },

    openProduct(p) {
        this.selectedProduct = p;
        this.isCheckout = false;
        document.body.style.overflow = 'hidden';
    },

    async handlePurchase() {
        if(!this.orderData.name || !this.orderData.phoneno) return alert('Please fill required fields');
        this.isSubmitting = true;
        try {
            const response = await fetch('/web/purchaseprodut', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...this.orderData,
                    productId: this.selectedProduct._id,
                    webid: this.webid
                })
            });
            const data = await response.json();
            if(response.ok) {
                alert('Order Placed Successfully');
                this.selectedProduct = null;
                this.orderData = { name: '', phoneno: '', location: '', email: '' };
                document.body.style.overflow = 'auto';
            }
        } finally { this.isSubmitting = false; }
    },

    async submitReview() {
        if(!this.reviewData.name || !this.reviewData.message) return alert('Fields cannot be empty');
        this.isSubmitting = true;
        try {
            const res = await fetch('/web/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: this.selectedProduct._id,
                    review: { ...this.reviewData }
                })
            });
            if(res.ok) {
                this.selectedProduct.reviews.push({ ...this.reviewData });
                this.reviewData = { name: '', message: '' };
            }
        } finally { this.isSubmitting = false; }
    }
}">

    <nav class="sticky top-0 z-50 glass border-b border-stone-100">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <img src="${brand.shoplogo}" class="w-10 h-10 rounded-full ring-2 ring-stone-100">
                <span class="text-xl font-bold tracking-tight brand-font uppercase text-obsidian">${brand.shopname}</span>
            </div>
            
            <div class="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
                <a href="#" class="hover:text-amber-600 transition">Atelier</a>
                <a href="#products" class="hover:text-amber-600 transition">Collection</a>
                <a href="#about" class="hover:text-amber-600 transition">Heritage</a>
            </div>

            <div class="flex items-center gap-4">
                <a href="tel:${brand.phone}" class="bg-obsidian text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-amber-700 transition shadow-xl">
                    Call Now
                </a>
            </div>
        </div>
    </nav>

    <header class="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img src="${brand.shophomepageimg}" class="absolute inset-0 w-full h-full object-cover scale-105 animate__animated animate__fadeIn">
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60"></div>
        
        <div class="relative text-center text-white px-6 max-w-4xl animate__animated animate__fadeInUp">
            <h2 class="uppercase tracking-[0.6em] text-[10px] mb-6 font-bold gold-text">Premium Experience • ${brand.city}</h2>
            <h1 class="text-5xl md:text-8xl mb-8 brand-font italic">A Legacy of <br> Quality & Style</h1>
            <p class="text-lg md:text-xl mb-12 font-light max-w-2xl mx-auto opacity-80 leading-relaxed">
                ${brand.shopdescription}
            </p>
            <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
                <a href="#products" class="px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-amber-600 hover:text-white transition-all shadow-2xl">
                    Discover More
                </a>
            </div>
        </div>
    </header>

    <main id="products" class="max-w-7xl mx-auto px-6 py-32">
        <div class="flex flex-col items-center text-center mb-24">
            <span class="gold-text text-[10px] font-bold uppercase tracking-[0.4em] mb-4">The Selection</span>
            <h2 class="text-4xl md:text-6xl font-bold brand-font text-obsidian italic">Seasonal Favorites</h2>
            <div class="w-20 h-[2px] bg-amber-600 mt-10"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            ${brand.shopProducts.length > 0 ? brand.shopProducts.map((p: any, i: number) => `
                <div @click="openProduct(${JSON.stringify(p).replace(/"/g, '&quot;')})" 
                     class="group cursor-pointer animate__animated animate__fadeInUp" style="animation-delay: ${i * 0.1}s">
                    <div class="relative aspect-[4/5] overflow-hidden rounded-sm bg-stone-200">
                        <img src="${p.productmainphoto}" class="w-full h-full object-cover transition duration-1000 group-hover:scale-110">
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                             <button class="px-8 py-3 bg-white text-black text-[9px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                View Details
                             </button>
                        </div>
                        <div class="absolute top-4 right-4 px-3 py-1 bg-white/90 text-[8px] font-bold uppercase tracking-widest text-obsidian">Limited Stock</div>
                    </div>
                    <div class="mt-8 flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-bold uppercase tracking-widest text-obsidian mb-1">${p.productname}</h3>
                            <p class="text-stone-400 text-[10px] italic">Curated Essentials</p>
                        </div>
                    </div>
                </div>
            `).join('') : `
                <div class="col-span-full py-20 text-center border border-dashed border-stone-200">
                    <p class="text-stone-400 italic">No products available at this moment.</p>
                </div>
            `}
        </div>
    </main>

    <section id="about" class="bg-obsidian py-32 text-white overflow-hidden relative">
        <div class="absolute right-0 top-0 opacity-10 pointer-events-none">
            <h1 class="text-[200px] brand-font font-bold leading-none select-none">${brand.shopname.split(' ')[0]}</h1>
        </div>
        <div class="max-w-5xl mx-auto px-6 relative z-10">
            <div class="grid md:grid-cols-2 gap-20 items-center">
                <div>
                    <span class="gold-text text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Our Story</span>
                    <h2 class="text-4xl md:text-5xl font-bold brand-font mb-8 italic">Defined by Elegance, <br> Driven by Quality</h2>
                    <p class="text-stone-400 leading-relaxed mb-10 text-lg font-light">
                        Located in the heart of ${brand.city}, our boutique offers a handpicked selection for those who appreciate the finer details. 
                        Every item is a testament to our commitment to excellence.
                    </p>
                    <div class="flex gap-4">
                         <a href="mailto:${brand.shopemail}" class="px-8 py-3 border border-stone-700 text-[10px] font-bold uppercase tracking-widest hover:border-amber-600 transition">Email Us</a>
                         <a href="tel:${brand.phone}" class="px-8 py-3 border border-stone-700 text-[10px] font-bold uppercase tracking-widest hover:border-amber-600 transition">Call Now</a>
                    </div>
                </div>
                <div class="bg-stone-900 p-12 border border-stone-800">
                    <h4 class="text-xs font-bold uppercase tracking-widest gold-text mb-6">Visit Our Boutique</h4>
                    <p class="text-stone-300 text-sm leading-loose mb-8 italic">
                        ${brand.shopadress}<br>
                        ${brand.city}, ${brand.country}
                    </p>
                    <div class="text-[10px] font-bold uppercase tracking-widest text-stone-500">Open Mon - Sat: 10:00 AM - 08:00 PM</div>
                </div>
            </div>
        </div>
    </section>

    <div x-show="selectedProduct" x-cloak class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/95 backdrop-blur-sm" @click="selectedProduct = null; document.body.style.overflow='auto'"></div>
        
        <div class="relative bg-white w-full max-w-6xl h-[90vh] md:h-[80vh] overflow-hidden flex flex-col md:flex-row shadow-2xl animate__animated animate__fadeInUp animate__faster">
            <button @click="selectedProduct = null; document.body.style.overflow='auto'" class="absolute top-6 right-6 z-20 hover:rotate-90 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="1.5"/></svg>
            </button>

            <div class="md:w-3/5 h-1/2 md:h-full bg-stone-50 p-12 flex flex-col items-center justify-center relative">
                <img :src="selectedProduct?.productmainphoto" class="max-w-full max-h-[70%] object-contain drop-shadow-2xl">
                <div class="flex gap-3 mt-10">
                    <template x-for="img in selectedProduct?.productextraphotos">
                        <img :src="img.imagesproduct" class="w-16 h-16 object-cover border border-stone-200 p-1 hover:border-amber-600 cursor-pointer transition">
                    </template>
                </div>
            </div>

            <div class="md:w-2/5 h-full overflow-y-auto bg-white p-10 flex flex-col border-l border-stone-100">
                
                <div x-show="!isCheckout" class="animate__animated animate__fadeIn">
                    <span class="text-[10px] font-bold uppercase tracking-[0.3em] gold-text mb-2 block" x-text="'Stock Available: ' + selectedProduct?.quantity"></span>
                    <h2 class="text-4xl font-bold brand-font mb-6 text-obsidian italic" x-text="selectedProduct?.productname"></h2>
                    <p class="text-stone-500 leading-relaxed mb-10 text-sm font-light italic" x-text="selectedProduct?.productdescription"></p>
                    
                    <button @click="isCheckout = true" class="w-full py-5 bg-obsidian text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-amber-700 transition-all shadow-xl mb-12">
                        Acquire Piece
                    </button>

                    <div class="border-t border-stone-100 pt-8">
                        <h4 class="text-[10px] font-bold uppercase tracking-widest mb-8 text-stone-400 italic">Recent Reviews</h4>
                        <div class="space-y-6 mb-10">
                            <template x-for="rev in selectedProduct?.reviews">
                                <div class="border-l-2 border-amber-600 pl-4">
                                    <p class="text-xs text-obsidian font-semibold mb-1 italic" x-text="'&ldquo;' + rev.message + '&rdquo;'"></p>
                                    <span class="text-[9px] uppercase tracking-widest text-stone-400" x-text="rev.name"></span>
                                </div>
                            </template>
                        </div>

                        <form @submit.prevent="submitReview" class="space-y-3">
                            <input x-model="reviewData.name" type="text" placeholder="Your Name" class="w-full p-4 bg-stone-50 text-[10px] uppercase outline-none focus:bg-stone-100">
                            <textarea x-model="reviewData.message" placeholder="Experience details..." class="w-full p-4 bg-stone-50 text-[10px] outline-none h-20 focus:bg-stone-100"></textarea>
                            <button type="submit" class="w-full py-3 border border-obsidian text-[9px] font-bold uppercase tracking-widest hover:bg-obsidian hover:text-white transition">Post Review</button>
                        </form>
                    </div>
                </div>

                <div x-show="isCheckout" class="animate__animated animate__fadeInRight">
                    <button @click="isCheckout = false" class="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-10 flex items-center gap-2">
                        ← Back to Boutique
                    </button>
                    <h2 class="text-3xl font-bold brand-font mb-2">Order Request</h2>
                    <p class="text-xs text-stone-400 mb-10">Enter your details and our team will contact you for delivery.</p>
                    
                    <form @submit.prevent="handlePurchase" class="space-y-5">
                        <div class="space-y-2">
                            <label class="text-[9px] uppercase font-bold text-stone-400 tracking-widest">Legal Name</label>
                            <input x-model="orderData.name" type="text" required class="w-full p-4 bg-stone-50 border-b border-stone-200 outline-none focus:border-amber-600 transition">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[9px] uppercase font-bold text-stone-400 tracking-widest">Phone Number</label>
                            <input x-model="orderData.phoneno" type="tel" required class="w-full p-4 bg-stone-50 border-b border-stone-200 outline-none focus:border-amber-600 transition">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[9px] uppercase font-bold text-stone-400 tracking-widest">Email</label>
                            <input x-model="orderData.email" type="email" required class="w-full p-4 bg-stone-50 border-b border-stone-200 outline-none focus:border-amber-600 transition">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[9px] uppercase font-bold text-stone-400 tracking-widest">Full Address</label>
                            <input x-model="orderData.location" type="text" required class="w-full p-4 bg-stone-50 border-b border-stone-200 outline-none focus:border-amber-600 transition">
                        </div>
                        
                        <button type="submit" :disabled="isSubmitting" class="w-full py-5 bg-obsidian text-white text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl disabled:opacity-50 mt-6">
                            <span x-text="isSubmitting ? 'Securing Order...' : 'Confirm Request'"></span>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>

    <footer class="bg-white py-24 px-6 border-t border-stone-100">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
            <div class="col-span-1 md:col-span-2">
                <h3 class="text-2xl font-bold brand-font mb-8 uppercase text-obsidian">${brand.shopname}</h3>
                <p class="max-w-sm text-xs text-stone-500 leading-relaxed mb-10 italic">${brand.shopdescription}</p>
                <div class="flex gap-8">
                    ${brand.shoplinks.map((s: any) => `
                        <a href="${s.link}" class="text-[9px] font-bold uppercase tracking-[0.3em] hover:text-amber-600 transition">${s.link.includes('fb') ? 'Facebook' : 'Instagram'}</a>
                    `).join('')}
                </div>
            </div>
            
            <div class="text-[10px] uppercase tracking-widest space-y-6">
                <h4 class="font-bold text-obsidian">Connect</h4>
                <a href="mailto:${brand.shopemail}" class="block hover:text-amber-600 transition">${brand.shopemail}</a>
                <a href="tel:${brand.phone}" class="block hover:text-amber-600 transition">${brand.phone}</a>
            </div>

            <div class="text-[10px] uppercase tracking-widest space-y-6">
                <h4 class="font-bold text-obsidian">Visit</h4>
                <p class="text-stone-400 leading-loose">${brand.shopadress}<br>${brand.city}, ${brand.country}</p>
            </div>
        </div>
        <div class="max-w-7xl mx-auto mt-24 pt-10 border-t border-stone-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] uppercase tracking-[0.4em] text-stone-400">
            <p>© 2026 ${brand.shopname}. Crafting Excellence.</p>
            <p>Designed for the Modern Lifestyle</p>
        </div>
    </footer>

</body>
</html>`;

}

else if (brand.theme === "forest") {
    return `
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brand.shopname} | Botanical Excellence</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;600&family=Montserrat:wght@300;500&display=swap" rel="stylesheet">
    
    <style>
        :root { --primary: #2d4a22; --accent: #a3b18a; --bg: #f0f2ed; --text: #1b2614; }
        .theme-forest { background-color: var(--bg); color: var(--text); }
        
        body { 
            font-family: 'Inter', sans-serif; 
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .heading-font { font-family: 'DM Serif Display', serif; }
        .nav-font { font-family: 'Montserrat', sans-serif; }

        .glass { 
            background: rgba(255, 255, 255, 0.7); 
            backdrop-filter: blur(12px); 
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255,255,255,0.2);
        }

        .perfume-card { transition: transform 0.4s ease, box-shadow 0.4s ease; }
        @media (min-width: 768px) {
            .perfume-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        }

        [x-cloak] { display: none !important; }
        
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 10px; }
    </style>
</head>
<body x-data="{ 
    mobileMenu: false,
    selectedProduct: null,
    isCheckout: false,
    isSubmitting: false,
    webid: '${webId}',
    orderData: { name: '', phoneno: '', location: '', email: '' },
    reviewData: { name: '', message: '' },

    openProduct(p) {
        this.selectedProduct = p;
        this.isCheckout = false;
        document.body.style.overflow = 'hidden';
    },

    closeModal() {
        this.selectedProduct = null;
        document.body.style.overflow = 'auto';
    },

    async handlePurchase() {
        if(!this.orderData.name || !this.orderData.phoneno) return alert('Please fill required fields');
        this.isSubmitting = true;
        try {
            const response = await fetch('/web/purchaseprodut', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...this.orderData,
                    productId: this.selectedProduct._id,
                    webid: this.webid
                })
            });
            if(response.ok) {
                alert('Order Placed Successfully');
                this.closeModal();
                this.orderData = { name: '', phoneno: '', location: '', email: '' };
            }
        } finally { this.isSubmitting = false; }
    },

    async submitReview() {
        if(!this.reviewData.name || !this.reviewData.message) return alert('Fields cannot be empty');
        this.isSubmitting = true;
        try {
            const res = await fetch('/web/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: this.selectedProduct._id,
                    review: { ...this.reviewData }
                })
            });
            if(res.ok) {
                this.selectedProduct.reviews.push({ ...this.reviewData });
                this.reviewData = { name: '', message: '' };
            }
        } finally { this.isSubmitting = false; }
    }
}" class="theme-forest">

    <nav class="fixed top-0 w-full z-[100] glass">
        <div class="max-w-7xl mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between">
            <div class="flex items-center gap-3 md:gap-4">
                <img src="${brand.shoplogo}" class="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover">
                <h1 class="heading-font text-2xl md:text-3xl tracking-tight" style="color: var(--primary)">${brand.shopname}.</h1>
            </div>
            
            <div class="hidden md:flex gap-12 nav-font text-[10px] uppercase tracking-[0.3em] font-medium opacity-70">
                <a href="#shop" class="hover:opacity-100 transition">Collection</a>
                <a href="tel:${brand.phone}" class="hover:opacity-100 transition">Contact</a>
                <span class="px-4 py-1 border rounded-full border-[var(--primary)] text-[var(--primary)]">${brand.city}</span>
            </div>

            <button @click="mobileMenu = !mobileMenu" class="md:hidden p-2 text-[var(--primary)]">
                <svg x-show="!mobileMenu" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                <svg x-show="mobileMenu" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>

        <div x-show="mobileMenu" x-transition.opacity class="md:hidden absolute top-20 left-0 w-full bg-white p-6 shadow-xl border-b border-stone-100">
            <div class="flex flex-col gap-6 nav-font text-xs uppercase tracking-widest text-center">
                <a @click="mobileMenu = false" href="#shop" class="py-2">Collection</a>
                <a @click="mobileMenu = false" href="tel:${brand.phone}" class="py-2">Contact Us</a>
                <div class="pt-4 border-t opacity-50 font-bold">${brand.city}</div>
            </div>
        </div>
    </nav>

    <header class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <img src="${brand.shophomepageimg}" class="absolute inset-0 w-full h-full object-cover opacity-30">
        <div class="absolute inset-0 z-0">
            <div class="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full opacity-20 blur-3xl animate-pulse" style="background: var(--accent)"></div>
        </div>

        <div class="relative z-10 text-center px-6 max-w-4xl">
            <span class="nav-font text-[10px] md:text-[11px] uppercase tracking-[0.5em] mb-6 md:mb-8 block opacity-60">The Essence of Living</span>
            <h1 class="heading-font text-5xl md:text-[100px] leading-[1.1] md:leading-[0.9] mb-8 md:mb-12 animate__animated animate__fadeInUp">
                Naturally <br class="hidden md:block"> <span class="italic font-light opacity-80">Refined</span>
            </h1>
            <p class="text-base md:text-xl font-light mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed opacity-80">
                ${brand.shopdescription}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                <a href="#shop" class="px-10 py-4 md:px-12 md:py-5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest shadow-xl transition-all hover:scale-105" style="background-color: var(--primary)">
                    Explore Collection
                </a>
            </div>
        </div>
    </header>

    <main id="shop" class="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-4">
            <div>
                <h2 class="heading-font text-4xl md:text-5xl mb-2 md:mb-4">Curated Pieces</h2>
                <p class="opacity-60 italic text-sm md:text-base">Handpicked from our boutique in ${brand.city}.</p>
            </div>
            <div class="hidden md:block w-24 h-[1px]" style="background-color: var(--primary)"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            ${brand.shopProducts.map((p: any) => `
                <div @click="openProduct(${JSON.stringify(p).replace(/"/g, '&quot;')})" class="perfume-card group cursor-pointer">
                    <div class="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white p-3 md:p-4 shadow-sm">
                        <img src="${p.productmainphoto}" class="w-full h-full object-cover rounded-xl transition duration-700 group-hover:scale-110">
                        <div class="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <span class="text-xl">+</span>
                        </div>
                    </div>
                    <div class="mt-6 md:mt-8 px-2">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="heading-font text-xl md:text-2xl">${p.productname}</h3>
                            <span class="font-light text-sm">Qty: ${p.quantity}</span>
                        </div>
                        <p class="text-[10px] uppercase tracking-widest opacity-50">Premium Selection</p>
                    </div>
                </div>
            `).join('')}
        </div>
    </main>

    <div x-show="selectedProduct" x-cloak class="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-6">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-md" @click="closeModal()"></div>
        <div class="relative bg-white w-full max-w-5xl h-full md:h-[85vh] md:rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl animate__animated animate__slideInUp md:animate__fadeInUp">
            
            <button @click="closeModal()" class="absolute top-6 right-6 z-50 bg-white/80 w-10 h-10 rounded-full flex items-center justify-center md:bg-transparent md:w-auto md:h-auto opacity-70 hover:opacity-100 text-2xl">✕</button>

            <div class="h-1/2 md:h-auto md:w-1/2 bg-stone-100">
                <img :src="selectedProduct?.productmainphoto" class="w-full h-full object-cover">
            </div>

            <div class="h-1/2 md:h-auto md:w-1/2 p-6 md:p-12 overflow-y-auto">
                <div x-show="!isCheckout">
                    <h2 class="heading-font text-3xl md:text-4xl mb-4" x-text="selectedProduct?.productname"></h2>
                    <p class="opacity-60 text-base md:text-lg mb-8 leading-relaxed" x-text="selectedProduct?.productdescription"></p>
                    
                    <button @click="isCheckout = true" class="w-full py-4 md:py-5 rounded-xl text-white font-bold uppercase tracking-widest text-[10px] mb-8" style="background-color: var(--primary)">
                        Order This Piece
                    </button>

                    <div class="border-t pt-8 pb-4">
                        <h4 class="nav-font text-[10px] uppercase font-bold mb-6 opacity-40">Client Reviews</h4>
                        <div class="space-y-4 mb-8">
                            <template x-for="rev in selectedProduct?.reviews">
                                <div class="bg-stone-50 p-4 rounded-lg">
                                    <p class="text-sm italic" x-text="'&ldquo;' + rev.message + '&rdquo;'"></p>
                                    <span class="text-[9px] uppercase font-bold opacity-40 mt-2 block" x-text="rev.name"></span>
                                </div>
                            </template>
                        </div>
                        <form @submit.prevent="submitReview" class="space-y-3">
                            <input x-model="reviewData.name" type="text" placeholder="Name" class="w-full p-3 bg-stone-50 rounded-lg outline-none border focus:border-green-800 text-sm">
                            <textarea x-model="reviewData.message" placeholder="Your thoughts..." class="w-full p-3 bg-stone-50 rounded-lg outline-none border focus:border-green-800 h-20 text-sm"></textarea>
                            <button type="submit" class="text-[10px] uppercase font-bold tracking-widest opacity-60 hover:opacity-100">Submit Review</button>
                        </form>
                    </div>
                </div>

                <div x-show="isCheckout" class="animate__animated animate__fadeIn">
                    <button @click="isCheckout = false" class="text-[10px] font-bold uppercase mb-6 opacity-40 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                        Back
                    </button>
                    <h2 class="heading-font text-2xl md:text-3xl mb-8">Shipping Details</h2>
                    <form @submit.prevent="handlePurchase" class="space-y-4">
                        <input x-model="orderData.name" type="text" placeholder="Full Name" required class="w-full p-4 border-b outline-none text-sm">
                        <input x-model="orderData.phoneno" type="tel" placeholder="Phone Number" required class="w-full p-4 border-b outline-none text-sm">
                        <input x-model="orderData.email" type="email" placeholder="Email Address" required class="w-full p-4 border-b outline-none text-sm">
                        <input x-model="orderData.location" type="text" placeholder="Delivery Address" required class="w-full p-4 border-b outline-none text-sm">
                        <button type="submit" :disabled="isSubmitting" class="w-full py-5 rounded-xl text-white font-bold uppercase tracking-widest text-[10px] mt-4" style="background-color: var(--primary)">
                            <span x-text="isSubmitting ? 'Processing...' : 'Confirm Order'"></span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <footer class="py-16 md:py-24 px-6 md:px-8 border-t border-black/5 bg-white">
        <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            <div class="sm:col-span-2">
                <h3 class="heading-font text-3xl mb-6 md:mb-8">${brand.shopname}</h3>
                <p class="max-w-xs text-sm opacity-60 leading-relaxed mb-8 italic">${brand.shopdescription}</p>
                <div class="flex gap-6">
                    ${brand.shoplinks.map((s: any) => `
                        <a href="${s.link}" class="text-[10px] uppercase font-bold tracking-widest hover:opacity-50 transition border-b border-transparent hover:border-[var(--primary)] pb-1">Social</a>
                    `).join('')}
                </div>
            </div>
            <div class="text-[10px] uppercase tracking-widest space-y-4">
                <h4 class="font-bold mb-6 text-stone-400">Contact</h4>
                <p class="lowercase">${brand.shopemail}</p>
                <p>${brand.phone}</p>
            </div>
            <div class="text-[10px] uppercase tracking-widest space-y-4">
                <h4 class="font-bold mb-6 text-stone-400">Location</h4>
                <p>${brand.shopadress}</p>
                <p>${brand.city}, ${brand.country}</p>
            </div>
        </div>
        <div class="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-100 text-center">
             <p class="text-[9px] uppercase tracking-[0.3em] opacity-40">© ${new Date().getFullYear()} ${brand.shopname}. All Rights Reserved.</p>
        </div>
    </footer>

</body>
</html>`;
}

else if(brand.theme == "dark") {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brand.shopname} | Luxury Dark Edition</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
    <style>
        :root {
            --premium-gold: #c5a059;
            --soft-white: #f8f8f8;
            --deep-carbon: #0a0a0a;
            --muted-stone: #1a1a1a;
        }
        body { font-family: 'Plus Jakarta Sans', sans-serif; scroll-behavior: smooth; background-color: var(--deep-carbon); color: var(--soft-white); }
        .brand-font { font-family: 'Playfair Display', serif; }
        .glass-dark { background: rgba(10, 10, 10, 0.8); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .gold-text { color: var(--premium-gold); }
        .gold-border { border-color: var(--premium-gold); }
        [x-cloak] { display: none !important; }
        
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: var(--premium-gold); border-radius: 10px; }

        .product-card-bg { background: #111111; }
        input, textarea { background: #161616 !important; border-color: #222 !important; color: white !important; }
    </style>
</head>
<body x-data="{ 
    selectedProduct: null,
    isCheckout: false,
    isSubmitting: false,
    webid: '${webId}',
    orderData: { name: '', phoneno: '', location: '', email: '' },
    reviewData: { name: '', message: '' },

    openProduct(p) {
        this.selectedProduct = p;
        this.isCheckout = false;
        document.body.style.overflow = 'hidden';
    },

    async handlePurchase() {
        if(!this.orderData.name || !this.orderData.phoneno) return alert('Please fill required fields');
        this.isSubmitting = true;
        try {
            const response = await fetch('/web/purchaseprodut', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...this.orderData,
                    productId: this.selectedProduct._id,
                    webid: this.webid
                })
            });
            if(response.ok) {
                alert('Order Placed Successfully');
                this.selectedProduct = null;
                document.body.style.overflow = 'auto';
            }
        } finally { this.isSubmitting = false; }
    },

    async submitReview() {
        if(!this.reviewData.name || !this.reviewData.message) return alert('Fields cannot be empty');
        this.isSubmitting = true;
        try {
            const res = await fetch('/web/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: this.selectedProduct._id,
                    review: { ...this.reviewData }
                })
            });
            if(res.ok) {
                this.selectedProduct.reviews.push({ ...this.reviewData });
                this.reviewData = { name: '', message: '' };
            }
        } finally { this.isSubmitting = false; }
    }
}">

    <nav class="sticky top-0 z-50 glass-dark">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <img src="${brand.shoplogo}" class="w-10 h-10 rounded-full ring-1 ring-white/10">
                <span class="text-xl font-bold tracking-tight brand-font uppercase text-white">${brand.shopname}</span>
            </div>
            
            <div class="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500">
                <a href="#" class="hover:text-amber-500 transition">Collection</a>
                <a href="#products" class="hover:text-amber-500 transition">Gallery</a>
                <a href="#about" class="hover:text-amber-500 transition">About</a>
            </div>

            <div class="flex items-center gap-4">
                <a href="tel:${brand.phone}" class="bg-white text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-white transition">
                    Contact
                </a>
            </div>
        </div>
    </nav>

    <header class="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img src="${brand.shophomepageimg}" class="absolute inset-0 w-full h-full object-cover scale-105 animate__animated animate__fadeIn opacity-60">
        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
        
        <div class="relative text-center px-6 max-w-4xl animate__animated animate__fadeInUp">
            <h2 class="uppercase tracking-[0.6em] text-[10px] mb-6 font-bold gold-text">Exclusive Access • ${brand.city}</h2>
            <h1 class="text-5xl md:text-8xl mb-8 brand-font italic text-white">Refined <br> Perfection</h1>
            <p class="text-lg md:text-xl mb-12 font-light max-w-2xl mx-auto text-stone-400 leading-relaxed">
                ${brand.shopdescription}
            </p>
            <a href="#products" class="inline-block px-12 py-5 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                View Collection
            </a>
        </div>
    </header>

    <main id="products" class="max-w-7xl mx-auto px-6 py-32">
        <div class="flex flex-col items-center text-center mb-24">
            <h2 class="text-4xl md:text-6xl font-bold brand-font text-white italic">The Archive</h2>
            <div class="w-12 h-[1px] bg-amber-500 mt-8"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            ${brand.shopProducts.length > 0 ? brand.shopProducts.map((p: any, i: number) => `
                <div @click="openProduct(${JSON.stringify(p).replace(/"/g, '&quot;')})" 
                     class="group cursor-pointer animate__animated animate__fadeInUp bg-[#0f0f0f] border border-white/5 p-4 transition-all hover:border-amber-500/50" style="animation-delay: ${i * 0.1}s">
                    <div class="relative aspect-square overflow-hidden bg-stone-900">
                        <img src="${p.productmainphoto}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700">
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <span class="text-[9px] font-bold uppercase tracking-widest text-white border-b border-amber-500 pb-1">View Piece</span>
                        </div>
                    </div>
                    <div class="mt-6">
                        <h3 class="text-xs font-bold uppercase tracking-widest text-white mb-2">${p.productname}</h3>
                        <p class="text-stone-600 text-[10px] uppercase tracking-tighter">Availability: ${p.quantity} Units</p>
                    </div>
                </div>
            `).join('') : `
                <div class="col-span-full py-20 text-center border border-white/5">
                    <p class="text-stone-500 italic">Vault is currently empty.</p>
                </div>
            `}
        </div>
    </main>

    <div x-show="selectedProduct" x-cloak class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/98 backdrop-blur-md" @click="selectedProduct = null; document.body.style.overflow='auto'"></div>
        
        <div class="relative bg-[#0f0f0f] w-full max-w-6xl h-[90vh] md:h-[80vh] overflow-hidden flex flex-col md:flex-row border border-white/10">
            <button @click="selectedProduct = null; document.body.style.overflow='auto'" class="absolute top-6 right-6 z-20 text-white/50 hover:text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2"/></svg>
            </button>

            <div class="md:w-3/5 h-1/2 md:h-full bg-black flex items-center justify-center">
                <img :src="selectedProduct?.productmainphoto" class="max-w-[80%] max-h-[80%] object-contain">
            </div>

            <div class="md:w-2/5 h-full overflow-y-auto p-10 border-l border-white/5 bg-[#0f0f0f]">
                <div x-show="!isCheckout">
                    <h2 class="text-3xl font-bold brand-font mb-4 text-white italic" x-text="selectedProduct?.productname"></h2>
                    <p class="text-stone-400 leading-relaxed mb-8 text-sm font-light" x-text="selectedProduct?.productdescription"></p>
                    
                    <button @click="isCheckout = true" class="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-amber-500 hover:text-white transition-all mb-10">
                        Request Inquiry
                    </button>

                    <div class="space-y-6 mb-10">
                        <h4 class="text-[9px] uppercase tracking-[0.2em] text-amber-500 font-bold mb-4">Client Feedback</h4>
                        <template x-for="rev in selectedProduct?.reviews">
                            <div class="border-l border-white/10 pl-4 py-1">
                                <p class="text-xs text-stone-300 italic mb-1" x-text="rev.message"></p>
                                <span class="text-[8px] uppercase text-stone-600" x-text="rev.name"></span>
                            </div>
                        </template>
                    </div>

                    <form @submit.prevent="submitReview" class="space-y-4 pt-6 border-t border-white/5">
                        <input x-model="reviewData.name" type="text" placeholder="YOUR NAME" class="w-full p-3 bg-transparent border border-white/10 text-[10px] uppercase tracking-widest outline-none focus:border-amber-500 transition">
                        <textarea x-model="reviewData.message" placeholder="SHARE YOUR EXPERIENCE..." class="w-full p-3 bg-transparent border border-white/10 text-[10px] uppercase tracking-widest outline-none focus:border-amber-500 h-24 transition"></textarea>
                        <button type="submit" class="text-[9px] uppercase font-bold tracking-[0.2em] text-white/40 hover:text-amber-500 transition-colors">
                            Submit Review
                        </button>
                    </form>
                </div>

                <div x-show="isCheckout" class="animate__animated animate__fadeInRight">
                    <h2 class="text-2xl font-bold brand-font mb-8 text-white">Client Details</h2>
                    <form @submit.prevent="handlePurchase" class="space-y-4">
                        <input x-model="orderData.name" type="text" placeholder="FULL NAME" class="w-full p-4 text-[10px] outline-none border border-white/10">
                        <input x-model="orderData.phoneno" type="tel" placeholder="PHONE NUMBER" class="w-full p-4 text-[10px] outline-none border border-white/10">
                        <input x-model="orderData.email" type="email" placeholder="EMAIL ADDRESS" class="w-full p-4 text-[10px] outline-none border border-white/10">
                        <textarea x-model="orderData.location" placeholder="DELIVERY ADDRESS" class="w-full p-4 text-[10px] outline-none border border-white/10 h-24"></textarea>
                        
                        <button type="submit" :disabled="isSubmitting" class="w-full py-4 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest disabled:opacity-50">
                            <span x-text="isSubmitting ? 'Processing...' : 'Confirm Order'"></span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <footer class="bg-black py-20 px-6 border-t border-white/5">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
            <div>
                <h3 class="text-xl font-bold brand-font mb-6 uppercase gold-text">${brand.shopname}</h3>
                <p class="text-[10px] text-stone-500 tracking-widest leading-loose">${brand.shopdescription}</p>
            </div>
            <div class="text-[10px] uppercase tracking-[0.2em] space-y-4 text-stone-400">
                <h4 class="text-white font-bold mb-4">Contact</h4>
                <p>${brand.shopemail}</p>
                <p>${brand.phone}</p>
            </div>
            <div class="text-[10px] uppercase tracking-[0.2em] space-y-4 text-stone-400">
                <h4 class="text-white font-bold mb-4">Location</h4>
                <p>${brand.shopadress}</p>
                <p>${brand.city}, ${brand.country}</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
}


else if(brand.theme == "greenwoods"){
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brand.shopname} | Botanical Essence</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    <style>
        :root {
            --nature-green: #A3B18A;
            --dark-green: #344E41;
            --cream: #F6F5F2;
            --soft-text: #4A4A4A;
        }
        body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            background-color: var(--cream); 
            color: var(--soft-text);
            scroll-behavior: smooth; 
        }
        .brand-font { font-family: 'Playfair Display', serif; }
        .bg-nature { background-color: var(--nature-green); }
        .btn-premium {
            background-color: var(--dark-green);
            color: white;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-premium:hover {
            background-color: var(--nature-green);
            transform: translateY(-2px);
        }
        .soft-shadow { box-shadow: 0 10px 40px -10px rgba(52, 78, 65, 0.12); }
        [x-cloak] { display: none !important; }
        
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: var(--nature-green); border-radius: 10px; }
    </style>
</head>
<body x-data="{ 
    selectedProduct: null,
    isCheckout: false,
    isSubmitting: false,
    webid: '${webId}',
    orderData: { name: '', phoneno: '', location: '', email: '' },
    reviewData: { name: '', message: '' },

    openProduct(p) {
        this.selectedProduct = p;
        this.isCheckout = false;
        document.body.style.overflow = 'hidden';
    },

    async handlePurchase() {
        if(!this.orderData.name || !this.orderData.phoneno || !this.orderData.email || !this.orderData.location) 
            return alert('Please complete all fields to secure your order.');
        
        this.isSubmitting = true;
        try {
            const response = await fetch('/web/purchaseprodut', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...this.orderData,
                    productId: this.selectedProduct._id,
                    webid: this.webid
                })
            });
            if(response.ok) {
                alert('Order request received. We will contact you shortly.');
                this.selectedProduct = null;
                this.orderData = { name: '', phoneno: '', location: '', email: '' };
                document.body.style.overflow = 'auto';
            }
        } finally { this.isSubmitting = false; }
    },

    async submitReview() {
        if(!this.reviewData.name || !this.reviewData.message) return alert('Fields cannot be empty');
        this.isSubmitting = true;
        try {
            const res = await fetch('/web/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: this.selectedProduct._id,
                    review: { ...this.reviewData }
                })
            });
            if(res.ok) {
                this.selectedProduct.reviews.push({ ...this.reviewData });
                this.reviewData = { name: '', message: '' };
            }
        } finally { this.isSubmitting = false; }
    }
}">

    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div class="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <img src="${brand.shoplogo}" class="w-9 h-9 rounded-full ring-1 ring-stone-100">
                <span class="text-lg font-medium tracking-widest brand-font uppercase text-[#344E41]">${brand.shopname}</span>
            </div>
            <div class="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-400">
                <a href="#products" class="hover:text-[#344E41] transition">Collection</a>
                <a href="#about" class="hover:text-[#344E41] transition">Origin</a>
            </div>
            <a href="tel:${brand.phone}" class="bg-[#344E41] text-white px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest hover:opacity-90 transition shadow-lg">
                Call Studio
            </a>
        </div>
    </nav>

    <header class="relative h-[85vh] flex items-center justify-center">
        <div class="max-w-7xl mx-auto px-8 grid md:grid-cols-2 items-center gap-12">
            <div class="animate__animated animate__fadeInLeft">
                <span class="text-nature text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">Pure • Organic • Conscious</span>
                <h1 class="text-5xl md:text-7xl mb-8 brand-font leading-tight text-[#344E41]">Nature's Finest <br> <span class="italic text-nature">Refined.</span></h1>
                <p class="text-base md:text-lg mb-10 font-light max-w-md opacity-70 leading-relaxed">${brand.shopdescription}</p>
                <a href="#products" class="inline-block px-12 py-4 btn-premium text-[11px] font-bold uppercase tracking-widest rounded-sm">Explore Scents</a>
            </div>
            <div class="relative animate__animated animate__fadeIn">
                <div class="aspect-[4/5] rounded-t-full overflow-hidden soft-shadow border-[10px] border-white">
                    <img src="${brand.shophomepageimg}" class="w-full h-full object-cover">
                </div>
            </div>
        </div>
    </header>

    <main id="products" class="max-w-6xl mx-auto px-8 py-32">
        <div class="flex flex-col items-center text-center mb-24">
            <h2 class="text-4xl md:text-5xl font-light brand-font text-[#344E41]">The Botanical Edit</h2>
            <div class="w-12 h-px bg-nature mt-6"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
            ${brand.shopProducts.length > 0 ? brand.shopProducts.map((p: any, i: number) => `
                <div @click="openProduct(${JSON.stringify(p).replace(/"/g, '&quot;')})" 
                     class="group cursor-pointer">
                    <div class="relative aspect-square overflow-hidden bg-white mb-8 transition-all duration-700 group-hover:soft-shadow flex items-center justify-center">
                        <img src="${p.productmainphoto}" class="w-full h-full object-cover p-4 opacity-90 group-hover:scale-105 transition-transform duration-1000">
                        <div class="absolute inset-0 bg-white/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span class="bg-white px-6 py-2 text-[9px] uppercase font-bold tracking-[0.2em] shadow-sm">View Details</span>
                        </div>
                    </div>
                    <h3 class="text-[12px] font-semibold text-[#344E41] uppercase tracking-widest text-center">${p.productname}</h3>
                </div>
            `).join('') : '<p class="col-span-full text-center italic opacity-40">Restocking our harvest...</p>'}
        </div>
    </main>

    <div x-show="selectedProduct" x-cloak class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-[#344E41]/30 backdrop-blur-md" @click="selectedProduct = null; document.body.style.overflow='auto'"></div>
        
        <div class="relative bg-cream w-full max-w-5xl h-[90vh] md:h-[80vh] overflow-hidden flex flex-col md:flex-row soft-shadow animate__animated animate__fadeInUp animate__faster">
            <button @click="selectedProduct = null; document.body.style.overflow='auto'" class="absolute top-6 right-6 z-20 text-[#344E41] hover:scale-110 transition">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="1.2"/></svg>
            </button>

            <div class="md:w-1/2 h-2/5 md:h-full bg-white flex items-center justify-center p-8">
                <img :src="selectedProduct?.productmainphoto" class="max-w-full max-h-[80%] object-contain">
            </div>

            <div class="md:w-1/2 h-3/5 md:h-full overflow-y-auto p-10 md:p-16 flex flex-col border-l border-stone-100">
                <div x-show="!isCheckout" class="animate__animated animate__fadeIn">
                    <span class="text-nature text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block" x-text="selectedProduct?.quantity + ' Items in Stock'"></span>
                    <h2 class="text-4xl brand-font mb-6 text-[#344E41]" x-text="selectedProduct?.productname"></h2>
                    <p class="text-stone-500 leading-relaxed mb-10 text-sm font-light" x-text="selectedProduct?.productdescription"></p>
                    
                    <button @click="isCheckout = true" class="w-full py-5 btn-premium text-[11px] font-bold uppercase tracking-[0.3em] rounded-sm mb-12 shadow-lg">
                        Acquire Piece
                    </button>

                    <div class="border-t border-stone-200 pt-10">
                        <h4 class="text-[10px] font-bold uppercase tracking-widest mb-8 text-stone-400">User Experience</h4>
                        <div class="space-y-6 mb-10">
                            <template x-for="rev in selectedProduct?.reviews">
                                <div class="border-l border-nature pl-4">
                                    <p class="text-sm text-[#344E41] italic mb-1" x-text="'&ldquo;' + rev.message + '&rdquo;'"></p>
                                    <span class="text-[9px] uppercase tracking-widest text-stone-400" x-text="rev.name"></span>
                                </div>
                            </template>
                        </div>

                        <form @submit.prevent="submitReview" class="space-y-4">
                            <input x-model="reviewData.name" type="text" placeholder="Your Name" class="w-full p-4 bg-white/50 text-[11px] uppercase tracking-widest border border-stone-100 focus:border-nature outline-none transition">
                            <textarea x-model="reviewData.message" placeholder="Describe your experience..." class="w-full p-4 bg-white/50 text-[11px] border border-stone-100 focus:border-nature outline-none h-24 transition"></textarea>
                            <button type="submit" class="w-full py-4 border border-[#344E41] text-[10px] font-bold uppercase tracking-widest hover:bg-[#344E41] hover:text-white transition">Post Experience</button>
                        </form>
                    </div>
                </div>

                <div x-show="isCheckout" class="animate__animated animate__fadeInRight">
                    <button @click="isCheckout = false" class="text-[10px] font-bold uppercase text-stone-400 mb-10 tracking-widest">← Back to Details</button>
                    <h2 class="text-3xl brand-font mb-4 text-[#344E41]">Order Inquiry</h2>
                    <p class="text-xs text-stone-400 mb-10">Our consultants will reach out to finalize your shipping.</p>
                    
                    <form @submit.prevent="handlePurchase" class="space-y-5">
                        <div class="space-y-1">
                            <label class="text-[9px] uppercase font-bold text-stone-400 tracking-tighter">Full Name</label>
                            <input x-model="orderData.name" type="text" required class="w-full p-4 bg-white border-b border-stone-100 outline-none focus:border-nature transition text-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-[9px] uppercase font-bold text-stone-400 tracking-tighter">Phone Number</label>
                            <input x-model="orderData.phoneno" type="tel" required class="w-full p-4 bg-white border-b border-stone-100 outline-none focus:border-nature transition text-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-[9px] uppercase font-bold text-stone-400 tracking-tighter">Email Address</label>
                            <input x-model="orderData.email" type="email" required class="w-full p-4 bg-white border-b border-stone-100 outline-none focus:border-nature transition text-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-[9px] uppercase font-bold text-stone-400 tracking-tighter">Shipping Address</label>
                            <input x-model="orderData.location" type="text" required class="w-full p-4 bg-white border-b border-stone-100 outline-none focus:border-nature transition text-sm">
                        </div>
                        
                        <button type="submit" :disabled="isSubmitting" class="w-full py-5 btn-premium text-[11px] font-bold uppercase tracking-[0.4em] shadow-xl mt-6 disabled:opacity-50">
                            <span x-text="isSubmitting ? 'Confirming...' : 'Submit Request'"></span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <footer class="bg-white py-24 px-8 border-t border-stone-100 text-center md:text-left">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div class="max-w-sm">
                <h3 class="text-xl brand-font text-[#344E41] mb-6 uppercase tracking-widest">${brand.shopname}</h3>
                <p class="text-xs text-stone-400 leading-loose italic">${brand.shopdescription}</p>
            </div>
            <div class="flex flex-wrap justify-center gap-12">
                <div class="space-y-4">
                    <h4 class="text-[10px] uppercase tracking-widest text-[#344E41] font-bold">Connect</h4>
                    <a href="tel:${brand.phone}" class="block text-[10px] text-stone-400 hover:text-nature transition uppercase">Call Studio</a>
                    <a href="mailto:${brand.shopemail}" class="block text-[10px] text-stone-400 hover:text-nature transition lowercase">${brand.shopemail}</a>
                </div>
                <div class="space-y-4">
                    <h4 class="text-[10px] uppercase tracking-widest text-[#344E41] font-bold">Location</h4>
                    <p class="text-[10px] text-stone-400 leading-loose uppercase">${brand.shopadress}<br>${brand.city}, ${brand.country}</p>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>`;
}

};