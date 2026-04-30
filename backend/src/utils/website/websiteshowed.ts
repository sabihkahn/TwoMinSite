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
                                                   <h3 class="text-lg font-bold uppercase tracking-widest text-obsidian mb-1"> Price :${p.price}</h3>
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
                                                        <h3 class="heading-font text-xl md:text-2xl">Price: ${p.price}</h3>

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
                                                <h3 class="text-xs font-bold uppercase tracking-widest text-white mb-2">Price : ${p.price}</h3>

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
                                        <h3 class="text-[12px] font-semibold text-[#344E41] uppercase tracking-widest text-center">Price : ${p.price}</h3>

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

else if(brand.theme == "softglass") {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brand.shopname} | Boutique</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --accent-blue: #4FA3FF;
            --glass-bg: rgba(255, 255, 255, 0.7);
            --glass-border: rgba(255, 255, 255, 0.4);
        }
        body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            background-color: #F4F7FA; 
            background-image: radial-gradient(at 0% 0%, rgba(79, 163, 255, 0.1) 0px, transparent 50%), 
                              radial-gradient(at 100% 100%, rgba(79, 163, 255, 0.1) 0px, transparent 50%);
            color: #2D3748;
        }
        .glass-card {
            background: var(--glass-bg);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid var(--glass-border);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
        }
        .glass-nav {
            background: rgba(244, 247, 250, 0.8);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--glass-border);
        }
        .btn-primary {
            background-color: var(--accent-blue);
            transition: all 0.3s ease;
        }
        .btn-primary:hover {
            filter: brightness(1.1);
            transform: translateY(-1px);
            box-shadow: 0 10px 20px -10px var(--accent-blue);
        }
        .rounded-glass { border-radius: 20px; }
        [x-cloak] { display: none !important; }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #cbd5e0; border-radius: 10px; }
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

    <nav class="sticky top-0 z-50 glass-nav">
        <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="p-1 bg-white rounded-full shadow-sm">
                    <img src="${brand.shoplogo}" class="w-8 h-8 rounded-full">
                </div>
                <span class="text-lg font-bold tracking-tight text-slate-800">${brand.shopname}</span>
            </div>
            
            <div class="hidden md:flex gap-8 text-sm font-medium text-slate-500">
                <a href="#" class="hover:text-[#4FA3FF] transition">Home</a>
                <a href="#products" class="hover:text-[#4FA3FF] transition">Shop</a>
                <a href="#about" class="hover:text-[#4FA3FF] transition">About</a>
            </div>

            <a href="tel:${brand.phone}" class="btn-primary text-white px-5 py-2 rounded-full text-xs font-semibold shadow-sm">
                Contact
            </a>
        </div>
    </nav>

    <header class="relative pt-10 pb-20 px-6">
        <div class="max-w-7xl mx-auto">
            <div class="relative overflow-hidden rounded-[32px] h-[500px] shadow-2xl">
                <img src="${brand.shophomepageimg}" class="absolute inset-0 w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent flex items-center">
                    <div class="ml-12 max-w-xl animate__animated animate__fadeInLeft">
                        <span class="bg-[#4FA3FF]/10 text-[#4FA3FF] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                            Premium Collection
                        </span>
                        <h1 class="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                            Experience the <br><span class="text-[#4FA3FF]">Future</span> of Style
                        </h1>
                        <p class="text-slate-700 text-lg mb-8 leading-relaxed">
                            ${brand.shopdescription}
                        </p>
                        <a href="#products" class="btn-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg inline-block">
                            Shop Collection
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <main id="products" class="max-w-7xl mx-auto px-6 py-20">
        <div class="flex justify-between items-end mb-12">
            <div>
                <h2 class="text-3xl font-bold text-slate-900">Featured Products</h2>
                <p class="text-slate-500 mt-2">Curated for excellence in ${brand.city}</p>
            </div>
            <div class="h-1 w-20 bg-[#4FA3FF] rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            ${brand.shopProducts.length > 0 ? brand.shopProducts.map((p: any, i: number) => `
                <div @click="openProduct(${JSON.stringify(p).replace(/"/g, '&quot;')})" 
                     class="glass-card rounded-glass p-4 cursor-pointer group hover:-translate-y-2 transition-all duration-300">
                    <div class="aspect-square overflow-hidden rounded-2xl mb-5">
                        <img src="${p.productmainphoto}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="px-2">
                        <div class="flex justify-between items-center mb-1">
                            <h3 class="font-bold text-slate-800 text-lg">${p.productname}</h3>
                                                      <h3 class="font-bold text-slate-800 text-lg">Price: ${p.price}</h3>

                            <span class="text-[#4FA3FF] font-bold">Details</span>
                        </div>
                        <p class="text-slate-400 text-xs uppercase tracking-widest font-semibold">Ready to Ship</p>
                    </div>
                </div>
            `).join('') : `
                <div class="col-span-full py-20 glass-card rounded-glass text-center">
                    <p class="text-slate-400">Our collection is being updated. Stay tuned!</p>
                </div>
            `}
        </div>
    </main>

    <section id="about" class="max-w-7xl mx-auto px-6 py-20">
        <div class="glass-card rounded-[40px] p-10 md:p-20 flex flex-col md:flex-row items-center gap-16">
            <div class="flex-1">
                <h2 class="text-4xl font-bold text-slate-900 mb-6">Built on Trust and <br>Transparency.</h2>
                <p class="text-slate-600 leading-relaxed mb-8">
                    Based in ${brand.city}, we believe in creating a seamless shopping experience that mirrors the clarity of glass. 
                    Every product in our boutique is hand-selected to ensure it meets our rigorous standards of quality.
                </p>
                <div class="flex gap-4">
                    <div class="glass-card p-4 rounded-2xl flex-1 text-center">
                        <div class="text-2xl font-bold text-[#4FA3FF]">100%</div>
                        <div class="text-[10px] uppercase font-bold text-slate-400">Authentic</div>
                    </div>
                    <div class="glass-card p-4 rounded-2xl flex-1 text-center">
                        <div class="text-2xl font-bold text-[#4FA3FF]">24/7</div>
                        <div class="text-[10px] uppercase font-bold text-slate-400">Support</div>
                    </div>
                </div>
            </div>
            <div class="flex-1 w-full h-64 bg-slate-200 rounded-[30px] overflow-hidden">
                <div class="w-full h-full glass-nav flex flex-col items-center justify-center text-center p-8">
                    <h4 class="font-bold text-slate-800 mb-2">Visit Us</h4>
                    <p class="text-sm text-slate-500">${brand.shopadress}</p>
                    <p class="text-sm text-slate-500">${brand.city}, ${brand.country}</p>
                </div>
            </div>
        </div>
    </section>

    <div x-show="selectedProduct" x-cloak class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/20 backdrop-blur-md" @click="selectedProduct = null; document.body.style.overflow='auto'"></div>
        
        <div class="relative glass-card rounded-[32px] w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col md:flex-row animate__animated animate__zoomIn animate__faster">
            <button @click="selectedProduct = null; document.body.style.overflow='auto'" class="absolute top-6 right-6 z-20 p-2 glass-nav rounded-full">
                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2"/></svg>
            </button>

            <div class="md:w-1/2 h-1/2 md:h-full bg-white flex flex-col items-center justify-center p-8">
                <img :src="selectedProduct?.productmainphoto" class="max-w-full max-h-[80%] object-contain drop-shadow-xl">
                <div class="flex gap-2 mt-6">
                    <template x-for="img in selectedProduct?.productextraphotos">
                        <img :src="img.imagesproduct" class="w-12 h-12 object-cover rounded-xl border border-slate-100 shadow-sm">
                    </template>
                </div>
            </div>

            <div class="md:w-1/2 h-full overflow-y-auto p-10 bg-white/50 backdrop-blur-lg">
                <div x-show="!isCheckout">
                    <span class="text-[#4FA3FF] text-xs font-bold uppercase tracking-widest" x-text="'Stock: ' + selectedProduct?.quantity"></span>
                    <h2 class="text-3xl font-extrabold text-slate-900 mt-2 mb-4" x-text="selectedProduct?.productname"></h2>
                    <p class="text-slate-600 text-sm leading-relaxed mb-8" x-text="selectedProduct?.productdescription"></p>
                    
                    <button @click="isCheckout = true" class="w-full py-4 btn-primary text-white rounded-2xl font-bold shadow-lg mb-8">
                        Order Now
                    </button>

                    <div class="space-y-6">
                        <h4 class="text-sm font-bold text-slate-800 uppercase tracking-wider">Customer Experience</h4>
                        <div class="space-y-4">
                            <template x-for="rev in selectedProduct?.reviews">
                                <div class="glass-card p-4 rounded-2xl">
                                    <p class="text-sm text-slate-700 italic" x-text="'&ldquo;' + rev.message + '&rdquo;'"></p>
                                    <span class="text-[10px] font-bold text-[#4FA3FF] uppercase mt-2 block" x-text="rev.name"></span>
                                </div>
                            </template>
                        </div>

                        <form @submit.prevent="submitReview" class="mt-8 space-y-3">
                            <input x-model="reviewData.name" type="text" placeholder="Your Name" class="w-full p-4 glass-nav rounded-xl text-sm outline-none focus:ring-2 ring-[#4FA3FF]/30">
                            <textarea x-model="reviewData.message" placeholder="Write a review..." class="w-full p-4 glass-nav rounded-xl text-sm outline-none h-24 focus:ring-2 ring-[#4FA3FF]/30"></textarea>
                            <button type="submit" class="w-full py-3 border-2 border-[#4FA3FF] text-[#4FA3FF] text-xs font-bold uppercase rounded-xl hover:bg-[#4FA3FF] hover:text-white transition">Submit Review</button>
                        </form>
                    </div>
                </div>

                <div x-show="isCheckout" class="animate__animated animate__fadeInRight">
                    <button @click="isCheckout = false" class="text-xs font-bold text-slate-400 mb-8 flex items-center gap-2">
                        ← Back to Details
                    </button>
                    <h2 class="text-2xl font-bold text-slate-900 mb-6">Complete Purchase</h2>
                    
                    <form @submit.prevent="handlePurchase" class="space-y-4">
                        <input x-model="orderData.name" type="text" placeholder="Full Name" required class="w-full p-4 glass-nav rounded-xl text-sm">
                        <input x-model="orderData.phoneno" type="tel" placeholder="Phone Number" required class="w-full p-4 glass-nav rounded-xl text-sm">
                        <input x-model="orderData.email" type="email" placeholder="Email Address" required class="w-full p-4 glass-nav rounded-xl text-sm">
                        <input x-model="orderData.location" type="text" placeholder="Delivery Address" required class="w-full p-4 glass-nav rounded-xl text-sm">
                        
                        <button type="submit" :disabled="isSubmitting" class="w-full py-4 btn-primary text-white rounded-2xl font-bold shadow-lg disabled:opacity-50">
                            <span x-text="isSubmitting ? 'Processing...' : 'Confirm Order'"></span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <footer class="bg-white/50 backdrop-blur-md pt-20 pb-10 border-t border-white/40">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
                <h3 class="text-xl font-bold text-slate-900 mb-6">${brand.shopname}</h3>
                <p class="text-sm text-slate-500 leading-relaxed mb-8">${brand.shopdescription}</p>
                <div class="flex gap-4">
                    ${brand.shoplinks.map((s: any) => `
                        <a href="${s.link}" class="w-8 h-8 flex items-center justify-center glass-card rounded-lg hover:text-[#4FA3FF] transition text-xs">
                            <span class="sr-only">Social</span>
                            🔗
                        </a>
                    `).join('')}
                </div>
            </div>
            
            <div>
                <h4 class="text-sm font-bold text-slate-900 uppercase mb-6 tracking-widest">Connect</h4>
                <div class="space-y-4 text-sm text-slate-500 font-medium">
                    <p class="flex items-center gap-3">📧 ${brand.shopemail}</p>
                    <p class="flex items-center gap-3">📞 ${brand.phone}</p>
                </div>
            </div>

            <div>
                <h4 class="text-sm font-bold text-slate-900 uppercase mb-6 tracking-widest">Location</h4>
                <p class="text-sm text-slate-500 leading-relaxed">
                    ${brand.shopadress}<br>
                    ${brand.city}, ${brand.country}
                </p>
            </div>
        </div>
        <div class="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            © 2026 ${brand.shopname} • Powered by SoftGlass UI
        </div>
    </footer>

</body>
</html>`;
}

else if(brand.theme == "neonfuture") {

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brand.shopname} | Cybernetic Interface</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Orbitron:wght@400;500;700;900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        cyber: {
                            navy: '#0B0F1A',
                            black: '#05070D',
                            cyan: '#00F5FF',
                            purple: '#8B5CF6',
                            pink: '#FF00E5'
                        }
                    },
                    fontFamily: {
                        orbitron: ['Orbitron', 'sans-serif'],
                        inter: ['Inter', 'sans-serif']
                    }
                }
            }
        }
    </script>
    <style>
        body { 
            font-family: 'Inter', sans-serif; 
            scroll-behavior: smooth; 
            background: linear-gradient(135deg, #0B0F1A 0%, #05070D 100%);
            color: #E2E8F0;
            min-height: 100vh;
        }
        
        /* Cyberpunk Grid Background */
        .cyber-grid {
            position: fixed;
            inset: 0;
            z-index: -1;
            background-image: 
                linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px);
            background-size: 40px 40px;
            pointer-events: none;
        }

        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        
        /* Neon Glassmorphism */
        .glass-panel { 
            background: rgba(11, 15, 26, 0.6); 
            backdrop-filter: blur(12px); 
            border: 1px solid rgba(0, 245, 255, 0.15);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }
        
        /* Glowing Text */
        .neon-text-cyan {
            color: #00F5FF;
            text-shadow: 0 0 10px rgba(0, 245, 255, 0.7);
        }
        .neon-text-pink {
            color: #FF00E5;
            text-shadow: 0 0 10px rgba(255, 0, 229, 0.7);
        }

        /* Interactive Elements */
        .neon-btn {
            background: rgba(0, 245, 255, 0.05);
            border: 1px solid #00F5FF;
            color: #00F5FF;
            box-shadow: 0 0 10px rgba(0, 245, 255, 0.2), inset 0 0 10px rgba(0, 245, 255, 0.1);
            transition: all 0.3s ease;
        }
        .neon-btn:hover:not(:disabled) {
            background: rgba(0, 245, 255, 0.2);
            box-shadow: 0 0 20px rgba(0, 245, 255, 0.6), inset 0 0 15px rgba(0, 245, 255, 0.4);
            text-shadow: 0 0 5px #fff;
        }

        .neon-btn-pink {
            border: 1px solid #FF00E5;
            color: #FF00E5;
            box-shadow: 0 0 10px rgba(255, 0, 229, 0.2);
        }
        .neon-btn-pink:hover {
            background: rgba(255, 0, 229, 0.15);
            box-shadow: 0 0 20px rgba(255, 0, 229, 0.6);
        }

        .neon-input {
            background: rgba(5, 7, 13, 0.8);
            border: 1px solid rgba(139, 92, 246, 0.3);
            color: #00F5FF;
            transition: all 0.3s ease;
        }
        .neon-input:focus {
            outline: none;
            border-color: #00F5FF;
            box-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
        }
        .neon-input::placeholder { color: rgba(226, 232, 240, 0.3); }

        [x-cloak] { display: none !important; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #05070D; }
        ::-webkit-scrollbar-thumb { background: #00F5FF; border-radius: 10px; box-shadow: 0 0 10px #00F5FF; }
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
        if(!this.orderData.name || !this.orderData.phoneno) return alert('SYS_ERR: Missing Required Datapoints.');
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
                alert('TRANSACTION_COMPLETE: Order secured in the mainframe.');
                this.selectedProduct = null;
                this.orderData = { name: '', phoneno: '', location: '', email: '' };
                document.body.style.overflow = 'auto';
            }
        } finally { this.isSubmitting = false; }
    },

    async submitReview() {
        if(!this.reviewData.name || !this.reviewData.message) return alert('SYS_ERR: Input fields empty.');
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
    <div class="cyber-grid"></div>

    <nav class="sticky top-0 z-50 glass-panel border-b-cyber-cyan/30">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <div class="relative group">
                    <div class="absolute inset-0 bg-cyber-cyan rounded-full blur-md opacity-50 group-hover:opacity-100 transition duration-300"></div>
                    <img src="${brand.shoplogo}" class="relative w-10 h-10 rounded-full border-2 border-cyber-cyan object-cover">
                </div>
                <span class="text-xl font-orbitron font-bold tracking-widest uppercase neon-text-cyan">${brand.shopname}</span>
            </div>
            
            <div class="hidden md:flex gap-10 text-xs font-orbitron uppercase tracking-[0.2em] font-medium text-slate-400">
                <a href="#" class="hover:text-cyber-cyan hover:drop-shadow-[0_0_5px_rgba(0,245,255,0.8)] transition duration-300">Hub</a>
                <a href="#products" class="hover:text-cyber-cyan hover:drop-shadow-[0_0_5px_rgba(0,245,255,0.8)] transition duration-300">Arsenal</a>
                <a href="#about" class="hover:text-cyber-cyan hover:drop-shadow-[0_0_5px_rgba(0,245,255,0.8)] transition duration-300">Data_Core</a>
            </div>

            <div class="flex items-center gap-4">
                <a href="tel:${brand.phone}" class="neon-btn px-6 py-2 rounded-lg text-[10px] font-orbitron uppercase tracking-widest font-bold">
                    INIT COMMS
                </a>
            </div>
        </div>
    </nav>

    <header class="relative h-[85vh] flex items-center justify-center overflow-hidden border-b border-cyber-purple/20">
        <div class="absolute inset-0">
            <img src="${brand.shophomepageimg}" class="w-full h-full object-cover scale-105 animate__animated animate__pulse animate__infinite animate__slower opacity-40 mix-blend-luminosity">
            <div class="absolute inset-0 bg-gradient-to-b from-cyber-navy/80 via-transparent to-cyber-black/95"></div>
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-purple/20 via-transparent to-transparent"></div>
        </div>
        
        <div class="relative text-center px-6 max-w-4xl glass-panel p-12 rounded-2xl animate__animated animate__fadeInUp">
            <div class="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyber-cyan"></div>
            <div class="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyber-pink"></div>
            
            <h2 class="uppercase tracking-[0.5em] text-[10px] font-orbitron mb-6 text-cyber-purple drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">System Online • ${brand.city} Location</h2>
            <h1 class="text-5xl md:text-7xl mb-8 font-orbitron font-black text-white uppercase tracking-wider drop-shadow-2xl">
                Upgrade <br><span class="neon-text-cyan">Your Reality</span>
            </h1>
            <p class="text-sm md:text-base mb-10 font-light max-w-2xl mx-auto text-slate-300 leading-relaxed border-l-2 border-cyber-cyan/50 pl-4 text-left">
                > ${brand.shopdescription}
            </p>
            <div class="flex justify-center">
                <a href="#products" class="neon-btn px-10 py-4 rounded-sm text-xs font-orbitron font-bold uppercase tracking-[0.3em] flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-cyber-cyan animate-ping"></span> Browse Inventory
                </a>
            </div>
        </div>
    </header>

    <main id="products" class="max-w-7xl mx-auto px-6 py-32 relative">
        <div class="flex flex-col items-center text-center mb-20 relative z-10">
            <h2 class="text-4xl md:text-5xl font-bold font-orbitron text-white uppercase tracking-widest drop-shadow-lg mb-2">Hardware & Gear</h2>
            <p class="text-cyber-cyan font-orbitron text-xs tracking-[0.4em] uppercase">Select your upgrades</p>
            <div class="w-32 h-[1px] bg-gradient-to-r from-transparent via-cyber-pink to-transparent mt-8"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
            ${brand.shopProducts.length > 0 ? brand.shopProducts.map((p: any, i: number) => `
                <div @click="openProduct(${JSON.stringify(p).replace(/"/g, '&quot;')})" 
                     class="group cursor-pointer glass-panel rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 animate__animated animate__fadeInUp" style="animation-delay: ${i * 0.1}s">
                    <div class="relative aspect-[4/5] overflow-hidden bg-cyber-black">
                        <div class="absolute inset-0 bg-cyber-cyan/10 group-hover:bg-transparent transition duration-500 z-10 mix-blend-color"></div>
                        <img src="${p.productmainphoto}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-110 opacity-80 group-hover:opacity-100">
                        
                        <div class="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent z-10"></div>
                        
                        <div class="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            <h3 class="text-lg font-orbitron font-bold uppercase tracking-wide text-white mb-1 group-hover:text-cyber-cyan transition">${p.productname}</h3>
                                                        <h3 class="text-lg font-orbitron font-bold uppercase tracking-wide text-white mb-1 group-hover:text-cyber-cyan transition">Price: ${p.price}</h3>

                            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                <span class="w-8 h-[1px] bg-cyber-pink"></span>
                                <span class="text-cyber-pink text-[9px] font-orbitron uppercase tracking-widest">Access Data</span>
                            </div>
                        </div>
                        <div class="absolute top-4 right-4 z-20 px-2 py-1 bg-cyber-black/80 border border-cyber-cyan/50 text-cyber-cyan text-[8px] font-orbitron uppercase tracking-widest backdrop-blur-sm rounded-sm">
                            V-${Math.floor(Math.random() * 90 + 10)}.${Math.floor(Math.random() * 9)}
                        </div>
                    </div>
                </div>
            `).join('') : `
                <div class="col-span-full py-20 text-center glass-panel rounded-xl border-dashed border-cyber-purple/50">
                    <p class="text-cyber-purple font-orbitron animate-pulse">[ DATA NOT FOUND - INVENTORY EMPTY ]</p>
                </div>
            `}
        </div>
    </main>

    <section id="about" class="relative py-32 border-y border-cyber-cyan/20 bg-cyber-black overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-cyber-purple/10 via-transparent to-transparent"></div>
        <div class="max-w-6xl mx-auto px-6 relative z-10">
            <div class="grid md:grid-cols-2 gap-16 items-center">
                <div class="glass-panel p-10 rounded-2xl relative border-l-4 border-l-cyber-pink">
                    <span class="text-cyber-pink text-[10px] font-orbitron font-bold uppercase tracking-[0.4em] mb-4 block">> Root_Access</span>
                    <h2 class="text-3xl md:text-4xl font-bold font-orbitron mb-6 text-white uppercase drop-shadow-md">Forged in <br><span class="neon-text-cyan">The Sprawl</span></h2>
                    <p class="text-slate-400 leading-relaxed mb-8 text-sm font-mono border-l border-white/10 pl-4">
                        Operating out of sector ${brand.city}, we source high-end augments and apparel for edge-runners and corpo elites alike. Security, anonymity, and quality guaranteed.
                    </p>
                    <div class="flex gap-4">
                         <a href="mailto:${brand.shopemail}" class="neon-btn-pink px-6 py-2 rounded-sm text-[10px] font-orbitron uppercase tracking-widest bg-cyber-pink/5">Send Packet</a>
                    </div>
                </div>
                <div class="glass-panel p-10 rounded-2xl border-t border-cyber-cyan/30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwNTA3MGQiPjwvcmVjdD48cGF0aCBkPSJNMCAwdjhIOFYwSDB6bTQgNEw4IDBWMHoiIGZpbGw9IiMwYTBmMTgiIGZpbGwtb3BhY2l0eT0iMC41Ij48L3BhdGg+PC9zdmc+')]">
                    <h4 class="text-[11px] font-orbitron font-bold uppercase tracking-widest text-cyber-cyan mb-6 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        Physical Node
                    </h4>
                    <p class="text-slate-300 text-sm leading-loose mb-6 font-mono bg-cyber-navy/50 p-4 rounded border border-white/5">
                        ${brand.shopadress}<br>
                        ${brand.city}, ${brand.country}
                    </p>
                    <div class="text-[10px] font-orbitron uppercase tracking-widest text-cyber-purple flex justify-between">
                        <span>Status: <span class="text-green-400">ONLINE</span></span>
                        <span>10:00 - 20:00</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div x-show="selectedProduct" x-cloak class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-cyber-black/90 backdrop-blur-xl" @click="selectedProduct = null; document.body.style.overflow='auto'"></div>
        
        <div class="relative glass-panel rounded-2xl w-full max-w-6xl h-[90vh] md:h-[80vh] overflow-hidden flex flex-col md:flex-row shadow-[0_0_40px_rgba(0,245,255,0.15)] animate__animated animate__zoomIn animate__faster border border-cyber-cyan/30">
            <button @click="selectedProduct = null; document.body.style.overflow='auto'" class="absolute top-4 right-4 z-50 p-2 text-cyber-cyan hover:text-white bg-cyber-navy/80 border border-cyber-cyan/50 rounded-lg backdrop-blur-md transition-all hover:shadow-[0_0_15px_rgba(0,245,255,0.5)] group">
                <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2"/></svg>
            </button>

            <div class="md:w-1/2 h-[40%] md:h-full bg-cyber-navy/40 flex flex-col items-center justify-center relative p-8 border-r border-white/10">
                <div class="absolute top-6 left-6 text-[10px] text-cyber-cyan font-orbitron tracking-[0.3em] uppercase">Holo_Display</div>
                <div class="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-cyber-cyan/10 to-transparent pointer-events-none"></div>
                
                <img :src="selectedProduct?.productmainphoto" class="max-w-full max-h-[75%] object-contain drop-shadow-[0_0_20px_rgba(0,245,255,0.2)] z-10 relative">
                
                <div class="flex gap-4 mt-8 z-10 w-full overflow-x-auto pb-2 justify-center hide-scrollbar">
                    <template x-for="img in selectedProduct?.productextraphotos">
                        <img :src="img.imagesproduct" class="w-16 h-16 object-cover rounded-md border-2 border-white/10 hover:border-cyber-cyan cursor-pointer transition-all hover:shadow-[0_0_10px_rgba(0,245,255,0.5)] opacity-60 hover:opacity-100">
                    </template>
                </div>
            </div>

            <div class="md:w-1/2 h-full overflow-y-auto p-8 md:p-12 bg-cyber-black/60 custom-scrollbar relative">
                
                <div x-show="!isCheckout" class="animate__animated animate__fadeIn">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-[10px] font-orbitron font-bold uppercase tracking-[0.3em] text-cyber-purple border border-cyber-purple/30 px-3 py-1 rounded-full bg-cyber-purple/10" x-text="'Units: ' + selectedProduct?.quantity"></span>
                        <span class="text-[10px] font-mono text-slate-500">SECURE_CONNECTION</span>
                    </div>
                    
                    <h2 class="text-3xl md:text-4xl font-black font-orbitron mb-6 text-white uppercase drop-shadow-md" x-text="selectedProduct?.productname"></h2>
                    
                    <div class="bg-cyber-navy/50 border-l-2 border-cyber-cyan p-4 mb-8">
                        <p class="text-slate-300 leading-relaxed text-sm font-mono" x-text="selectedProduct?.productdescription"></p>
                    </div>
                    
                    <button @click="isCheckout = true" class="w-full py-4 neon-btn rounded-lg text-xs font-orbitron font-bold uppercase tracking-[0.4em] mb-12 shadow-lg flex justify-center items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        Initiate Purchase
                    </button>

                    <div class="border-t border-white/10 pt-8">
                        <h4 class="text-[10px] font-orbitron font-bold uppercase tracking-widest mb-6 text-cyber-pink flex items-center gap-2">
                            <span class="w-2 h-2 bg-cyber-pink rounded-full"></span> User_Logs
                        </h4>
                        
                        <div class="space-y-4 mb-8">
                            <template x-for="rev in selectedProduct?.reviews">
                                <div class="bg-cyber-navy/40 border border-white/5 p-4 rounded-lg">
                                    <p class="text-sm text-slate-300 font-inter mb-2" x-text="'&quot;' + rev.message + '&quot;'"></p>
                                    <span class="text-[9px] font-orbitron uppercase tracking-widest text-cyber-cyan" x-text="'> ' + rev.name"></span>
                                </div>
                            </template>
                            <div x-show="!selectedProduct?.reviews || selectedProduct?.reviews.length === 0" class="text-xs text-slate-500 font-mono italic">
                                No logs found in the database.
                            </div>
                        </div>

                        <form @submit.prevent="submitReview" class="space-y-4 p-5 bg-cyber-navy/20 border border-cyber-purple/20 rounded-xl">
                            <h5 class="text-[10px] font-orbitron text-slate-400 uppercase tracking-widest mb-2">Upload Log</h5>
                            <input x-model="reviewData.name" type="text" placeholder="Alias..." class="w-full p-3 neon-input rounded-md text-xs font-mono">
                            <textarea x-model="reviewData.message" placeholder="Encrypted transmission..." class="w-full p-3 neon-input rounded-md text-xs font-mono h-24 resize-none"></textarea>
                            <button type="submit" :disabled="isSubmitting" class="w-full py-3 bg-cyber-purple/10 border border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-white transition-all text-[10px] font-orbitron uppercase tracking-widest rounded-md">Transmit</button>
                        </form>
                    </div>
                </div>

                <div x-show="isCheckout" class="animate__animated animate__fadeInRight">
                    <button @click="isCheckout = false" class="text-[10px] font-orbitron font-bold uppercase tracking-widest text-slate-400 hover:text-cyber-cyan transition-colors mb-8 flex items-center gap-2">
                        ← Abort sequence
                    </button>
                    
                    <h2 class="text-2xl font-bold font-orbitron mb-2 text-white uppercase border-b border-cyber-cyan/20 pb-4">Secure Checkout</h2>
                    <p class="text-xs text-cyber-cyan font-mono mb-8 opacity-80">> Enter delivery coordinates and identification.</p>
                    
                    <form @submit.prevent="handlePurchase" class="space-y-5">
                        <div class="space-y-1">
                            <label class="text-[9px] font-orbitron uppercase text-slate-400 tracking-widest">Legal Designation</label>
                            <input x-model="orderData.name" type="text" required class="w-full p-4 neon-input rounded-lg font-mono text-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-[9px] font-orbitron uppercase text-slate-400 tracking-widest">Comm Link (Phone)</label>
                            <input x-model="orderData.phoneno" type="tel" required class="w-full p-4 neon-input rounded-lg font-mono text-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-[9px] font-orbitron uppercase text-slate-400 tracking-widest">Network ID (Email)</label>
                            <input x-model="orderData.email" type="email" required class="w-full p-4 neon-input rounded-lg font-mono text-sm">
                        </div>
                        <div class="space-y-1">
                            <label class="text-[9px] font-orbitron uppercase text-slate-400 tracking-widest">Physical Drop Point (Address)</label>
                            <input x-model="orderData.location" type="text" required class="w-full p-4 neon-input rounded-lg font-mono text-sm">
                        </div>
                        
                        <div class="pt-4">
                            <button type="submit" :disabled="isSubmitting" class="w-full py-4 neon-btn rounded-lg text-xs font-orbitron font-bold uppercase tracking-[0.3em] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                <span x-text="isSubmitting ? 'ENCRYPTING DATA...' : 'CONFIRM TRANSACTION'"></span>
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

    <footer class="glass-panel border-t border-cyber-cyan/20 pt-20 pb-10 px-6 mt-10 relative overflow-hidden">
        <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 w-3/4 h-20 bg-cyber-cyan/10 blur-[50px] rounded-full pointer-events-none"></div>
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            <div class="col-span-1 md:col-span-2">
                <h3 class="text-2xl font-bold font-orbitron mb-6 uppercase neon-text-cyan tracking-wider">${brand.shopname}</h3>
                <p class="max-w-sm text-sm text-slate-400 leading-relaxed mb-8 font-mono border-l-2 border-cyber-purple pl-3">${brand.shopdescription}</p>
                <div class="flex gap-4">
                    ${brand.shoplinks.map((s: any) => `
                        <a href="${s.link}" class="w-10 h-10 flex items-center justify-center rounded-md bg-cyber-navy border border-white/10 hover:border-cyber-cyan hover:shadow-[0_0_10px_rgba(0,245,255,0.4)] transition-all group">
                            <span class="text-xs font-orbitron font-bold text-slate-400 group-hover:text-cyber-cyan transition-colors uppercase">${s.link.includes('fb') ? 'FB' : 'IG'}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
            
            <div class="text-xs font-orbitron uppercase tracking-widest space-y-4">
                <h4 class="font-bold text-white border-b border-white/10 pb-2 inline-block mb-2">Comms</h4>
                <a href="mailto:${brand.shopemail}" class="block text-slate-400 hover:text-cyber-pink transition-colors">> ${brand.shopemail}</a>
                <a href="tel:${brand.phone}" class="block text-slate-400 hover:text-cyber-pink transition-colors">> ${brand.phone}</a>
            </div>

            <div class="text-xs font-orbitron uppercase tracking-widest space-y-4">
                <h4 class="font-bold text-white border-b border-white/10 pb-2 inline-block mb-2">Coordinates</h4>
                <p class="text-slate-400 font-mono text-sm leading-relaxed">> ${brand.shopadress}<br>> ${brand.city}, ${brand.country}</p>
            </div>
        </div>
        <div class="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-orbitron uppercase tracking-[0.3em] text-slate-500">
            <p>V 2.0.26 © ${brand.shopname}. ALL SYSTEM RIGHTS RESERVED.</p>
            <p class="text-cyber-cyan/50 animate-pulse">CONNECTION SECURE</p>
        </div>
    </footer>

</body>
</html>`;

}

else if(brand.theme == "darkblue"){

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brand.shopname} | Futuristic Portal</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Orbitron:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --dark-base: #020617;
            --dark-nav: #0A0F1F;
            --accent-blue: #60A5FA;
            --accent-purple: #8B5CF6;
        }
        body { 
            font-family: 'Inter', sans-serif; 
            scroll-behavior: smooth; 
            background: linear-gradient(135deg, var(--dark-nav) 0%, var(--dark-base) 100%);
            color: #e2e8f0;
            min-height: 100vh;
        }
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        
        /* Glassmorphism & Glowing Utilities */
        .glass-nav {
            background: rgba(10, 15, 31, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(139, 92, 246, 0.15);
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(96, 165, 250, 0.1);
            border-radius: 16px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
            transform: translateY(-4px);
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(96, 165, 250, 0.3);
            box-shadow: 0 10px 40px -10px rgba(96, 165, 250, 0.2);
        }
        .glass-modal {
            background: rgba(2, 6, 23, 0.85);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(139, 92, 246, 0.2);
            border-radius: 16px;
            box-shadow: 0 0 50px rgba(96, 165, 250, 0.15);
        }
        
        /* Futuristic Buttons & Inputs */
        .glow-button {
            background: linear-gradient(45deg, rgba(96, 165, 250, 0.1), rgba(139, 92, 246, 0.1));
            border: 1px solid rgba(96, 165, 250, 0.3);
            border-radius: 12px;
            color: #fff;
            transition: all 0.3s ease;
        }
        .glow-button:hover {
            background: linear-gradient(45deg, rgba(96, 165, 250, 0.2), rgba(139, 92, 246, 0.2));
            border-color: rgba(139, 92, 246, 0.6);
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
            transform: translateY(-2px);
        }
        .glass-input {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(96, 165, 250, 0.15);
            border-radius: 12px;
            color: #f8fafc;
            transition: all 0.3s ease;
        }
        .glass-input:focus {
            outline: none;
            background: rgba(255, 255, 255, 0.05);
            border-color: var(--accent-blue);
            box-shadow: 0 0 15px rgba(96, 165, 250, 0.2);
        }

        .text-gradient {
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-image: linear-gradient(to right, var(--accent-blue), var(--accent-purple));
        }

        [x-cloak] { display: none !important; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #475569; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #60A5FA; }
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
                alert('Order Initiated Successfully');
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

    <nav class="sticky top-0 z-50 glass-nav">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <img src="${brand.shoplogo}" class="w-10 h-10 rounded-full border border-[#8B5CF6]/40 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                <span class="text-xl font-bold tracking-wider font-orbitron uppercase text-white">${brand.shopname}</span>
            </div>
            
            <div class="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium text-slate-400">
                <a href="#" class="hover:text-[#60A5FA] transition-colors duration-300">System</a>
                <a href="#products" class="hover:text-[#60A5FA] transition-colors duration-300">Modules</a>
                <a href="#about" class="hover:text-[#60A5FA] transition-colors duration-300">Core</a>
            </div>

            <div class="flex items-center gap-4">
                <a href="tel:${brand.phone}" class="glow-button px-6 py-2 text-[10px] font-bold uppercase tracking-widest">
                    Initialize Comms
                </a>
            </div>
        </div>
    </nav>

    <header class="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img src="${brand.shophomepageimg}" class="absolute inset-0 w-full h-full object-cover scale-105 animate__animated animate__fadeIn opacity-40">
        <div class="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#0A0F1F]/60 to-[#020617]"></div>
        
        <div class="relative text-center text-white px-6 max-w-4xl animate__animated animate__fadeInUp">
            <h2 class="uppercase tracking-[0.5em] text-[11px] mb-6 font-medium text-[#60A5FA] drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
                Protocol Active • ${brand.city}
            </h2>
            <h1 class="text-5xl md:text-7xl mb-8 font-orbitron font-bold leading-tight">
                Next-Gen <br> <span class="text-gradient">Performance & Aesthetics</span>
            </h1>
            <p class="text-lg md:text-xl mb-12 font-light max-w-2xl mx-auto text-slate-300 leading-relaxed">
                ${brand.shopdescription}
            </p>
            <div class="flex flex-col md:flex-row gap-6 justify-center items-center">
                <a href="#products" class="glow-button px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em]">
                    View Products
                </a>
            </div>
        </div>
    </header>

    <main id="products" class="max-w-7xl mx-auto px-6 py-32">
        <div class="flex flex-col items-center text-center mb-24">
            <span class="text-[#8B5CF6] text-[11px] font-bold uppercase tracking-[0.4em] mb-4">Database Inventory</span>
            <h2 class="text-4xl md:text-5xl font-bold font-orbitron text-white">Available Modules</h2>
            <div class="w-24 h-[2px] bg-gradient-to-r from-[#60A5FA] to-[#8B5CF6] mt-8 shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            ${brand.shopProducts.length > 0 ? brand.shopProducts.map((p: any, i: number) => `
                <div @click="openProduct(${JSON.stringify(p).replace(/"/g, '&quot;')})" 
                     class="glass-card group cursor-pointer animate__animated animate__fadeInUp p-4" style="animation-delay: ${i * 0.1}s">
                    <div class="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#0A0F1F]">
                        <img src="${p.productmainphoto}" class="w-full h-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent opacity-60"></div>
                        
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm bg-[#0A0F1F]/30">
                             <button class="glow-button px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em]">
                                Inspect Data
                             </button>
                        </div>
                        <div class="absolute top-4 right-4 px-3 py-1 bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#e2e8f0] backdrop-blur-md">
                            Active
                        </div>
                    </div>
                    <div class="mt-6 px-2 flex justify-between items-start">
                        <div>
                            <h3 class="text-sm font-bold uppercase tracking-widest text-white font-orbitron mb-1">${p.productname}</h3>
                                                        <h3 class="text-sm font-bold uppercase tracking-widest text-white font-orbitron mb-1">Price : ${p.price}</h3>

                            <p class="text-[#60A5FA] text-[11px]">Hardware / Eq.</p>
                        </div>
                    </div>
                </div>
            `).join('') : `
                <div class="col-span-full py-20 text-center glass-card border-dashed">
                    <p class="text-slate-400 font-orbitron tracking-widest">No modules currently synced to database.</p>
                </div>
            `}
        </div>
    </main>

    <section id="about" class="relative py-32 text-white overflow-hidden border-t border-[#60A5FA]/10">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoOTYsIDE2NSwgMjUwLCAwLjEpIi8+PC9zdmc+')] opacity-30"></div>
        
        <div class="max-w-5xl mx-auto px-6 relative z-10">
            <div class="grid md:grid-cols-2 gap-20 items-center">
                <div>
                    <span class="text-[#60A5FA] text-[11px] font-bold uppercase tracking-[0.4em] mb-6 block">System Core</span>
                    <h2 class="text-4xl md:text-5xl font-bold font-orbitron mb-8 leading-tight">Engineered for the <br> <span class="text-gradient">Unknown</span></h2>
                    <p class="text-slate-400 leading-relaxed mb-10 text-base font-light">
                        Operating out of ${brand.city}, our mainframe synthesizes premium quality with futuristic aesthetics. 
                        Every module is calibrated to provide maximum efficiency and visual harmony for the modern user.
                    </p>
                    <div class="flex gap-4">
                         <a href="mailto:${brand.shopemail}" class="glow-button px-8 py-3 text-[10px] font-bold uppercase tracking-widest">Transmit Email</a>
                    </div>
                </div>
                <div class="glass-card p-10 relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/10 blur-3xl rounded-full"></div>
                    <div class="absolute bottom-0 left-0 w-32 h-32 bg-[#60A5FA]/10 blur-3xl rounded-full"></div>
                    
                    <h4 class="text-xs font-bold uppercase tracking-widest text-[#60A5FA] mb-6 font-orbitron relative z-10">Sector Location</h4>
                    <p class="text-slate-300 text-sm leading-loose mb-8 relative z-10">
                        ${brand.shopadress}<br>
                        ${brand.city}, ${brand.country}
                    </p>
                    <div class="text-[10px] font-medium uppercase tracking-widest text-slate-500 relative z-10 border-t border-[#60A5FA]/20 pt-4">
                        Uptime: Mon - Sat [1000 - 2000 HRS]
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div x-show="selectedProduct" x-cloak class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
        <div class="absolute inset-0 bg-[#020617]/90 backdrop-blur-sm" @click="selectedProduct = null; document.body.style.overflow='auto'"></div>
        
        <div class="relative glass-modal w-full max-w-6xl h-[90vh] md:h-[80vh] flex flex-col md:flex-row overflow-hidden animate__animated animate__zoomIn animate__faster">
            <button @click="selectedProduct = null; document.body.style.overflow='auto'" class="absolute top-6 right-6 z-50 text-slate-400 hover:text-white hover:rotate-90 transition-all duration-300">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" stroke-width="1.5"/></svg>
            </button>

            <div class="md:w-1/2 h-2/5 md:h-full p-8 md:p-12 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-[#60A5FA]/10 bg-[#0A0F1F]/40">
                <div class="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6]/5 to-[#60A5FA]/5 pointer-events-none"></div>
                <img :src="selectedProduct?.productmainphoto" class="max-w-full max-h-[70%] object-contain drop-shadow-[0_0_20px_rgba(96,165,250,0.2)] relative z-10 rounded-lg">
                <div class="flex gap-4 mt-8 relative z-10">
                    <template x-for="img in selectedProduct?.productextraphotos">
                        <img :src="img.imagesproduct" class="w-16 h-16 object-cover rounded-md border border-[#60A5FA]/20 opacity-70 hover:opacity-100 hover:border-[#60A5FA] cursor-pointer transition-all">
                    </template>
                </div>
            </div>

            <div class="md:w-1/2 h-full overflow-y-auto p-8 md:p-12 flex flex-col">
                
                <div x-show="!isCheckout" class="animate__animated animate__fadeIn">
                    <span class="text-[10px] font-bold uppercase tracking-[0.3em] text-[#60A5FA] mb-3 block" x-text="'Units Detected: ' + selectedProduct?.quantity"></span>
                    <h2 class="text-3xl md:text-4xl font-bold font-orbitron mb-6 text-white" x-text="selectedProduct?.productname"></h2>
                    <p class="text-slate-400 leading-relaxed mb-10 text-sm font-light" x-text="selectedProduct?.productdescription"></p>
                    
                    <button @click="isCheckout = true" class="w-full glow-button py-4 text-[11px] font-bold uppercase tracking-[0.3em] mb-12 flex justify-center items-center gap-3">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        Initiate Acquisition
                    </button>

                    <div class="border-t border-[#60A5FA]/10 pt-8">
                        <h4 class="text-[11px] font-bold uppercase tracking-widest mb-6 text-[#8B5CF6] font-orbitron">User Logs</h4>
                        <div class="space-y-4 mb-8">
                            <template x-for="rev in selectedProduct?.reviews">
                                <div class="glass-card p-4 border-l-2 border-l-[#60A5FA]">
                                    <p class="text-sm text-slate-300 mb-2" x-text="rev.message"></p>
                                    <span class="text-[9px] uppercase tracking-widest text-slate-500" x-text="'User // ' + rev.name"></span>
                                </div>
                            </template>
                        </div>

                        <form @submit.prevent="submitReview" class="space-y-4">
                            <input x-model="reviewData.name" type="text" placeholder="Alias" class="w-full p-4 glass-input text-[11px] uppercase tracking-wider">
                            <textarea x-model="reviewData.message" placeholder="Input feedback data..." class="w-full p-4 glass-input text-[12px] h-24 resize-none"></textarea>
                            <button type="submit" class="w-full py-3 border border-[#60A5FA]/30 rounded-xl text-[#60A5FA] text-[10px] font-bold uppercase tracking-widest hover:bg-[#60A5FA]/10 transition">Upload Log</button>
                        </form>
                    </div>
                </div>

                <div x-show="isCheckout" class="animate__animated animate__fadeInRight">
                    <button @click="isCheckout = false" class="text-[10px] font-bold uppercase tracking-widest text-[#60A5FA] mb-8 flex items-center gap-2 hover:text-white transition">
                        ← Abort & Return
                    </button>
                    <h2 class="text-3xl font-bold font-orbitron mb-3 text-white">Transmission Data</h2>
                    <p class="text-sm text-slate-400 mb-8">Input coordinates for secure module delivery.</p>
                    
                    <form @submit.prevent="handlePurchase" class="space-y-5">
                        <div class="space-y-2">
                            <label class="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Ident</label>
                            <input x-model="orderData.name" type="text" required class="w-full p-4 glass-input">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Commlink</label>
                            <input x-model="orderData.phoneno" type="tel" required class="w-full p-4 glass-input">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Network Node (Email)</label>
                            <input x-model="orderData.email" type="email" required class="w-full p-4 glass-input">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Sector Coordinates (Address)</label>
                            <input x-model="orderData.location" type="text" required class="w-full p-4 glass-input">
                        </div>
                        
                        <button type="submit" :disabled="isSubmitting" class="w-full glow-button py-5 text-[11px] font-bold uppercase tracking-[0.3em] disabled:opacity-50 mt-8">
                            <span x-text="isSubmitting ? 'Encrypting...' : 'Confirm Transmission'"></span>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>

    <footer class="bg-[#020617] py-20 px-6 border-t border-[#60A5FA]/10 relative overflow-hidden">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#60A5FA]/5 blur-[120px] pointer-events-none"></div>
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
            <div class="col-span-1 md:col-span-2">
                <h3 class="text-2xl font-bold font-orbitron mb-6 uppercase text-white tracking-wider">${brand.shopname}</h3>
                <p class="max-w-sm text-sm text-slate-400 leading-relaxed mb-8 font-light">${brand.shopdescription}</p>
                <div class="flex gap-6">
                    ${brand.shoplinks.map((s: any) => `
                        <a href="${s.link}" class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B5CF6] hover:text-[#60A5FA] transition-colors">${s.link.includes('fb') ? 'FB-NET' : 'IG-NET'}</a>
                    `).join('')}
                </div>
            </div>
            
            <div class="text-[11px] uppercase tracking-widest space-y-5">
                <h4 class="font-bold text-white font-orbitron">Network</h4>
                <a href="mailto:${brand.shopemail}" class="block text-slate-400 hover:text-[#60A5FA] transition-colors">${brand.shopemail}</a>
                <a href="tel:${brand.phone}" class="block text-slate-400 hover:text-[#60A5FA] transition-colors">${brand.phone}</a>
            </div>

            <div class="text-[11px] uppercase tracking-widest space-y-5">
                <h4 class="font-bold text-white font-orbitron">Location</h4>
                <p class="text-slate-400 leading-loose">${brand.shopadress}<br>${brand.city}, ${brand.country}</p>
            </div>
        </div>
        <div class="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#60A5FA]/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.4em] text-slate-500 relative z-10">
            <p>© 2026 ${brand.shopname}. ALL SYSTEMS NOMINAL.</p>
            <p>UI_VER_DARKBLUE_1.0</p>
        </div>
    </footer>

</body>
</html>`;

}

else if(brand.theme == "gothic"){
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brand.shopname} | Eternal Collection</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&display=swap" rel="stylesheet">
    <style>
        :root {
            --gothic-gold: #c5a059;
            --deep-void: #0a0a0a;
            --blood-red: #4a0404;
        }
        body { 
            background-color: var(--deep-void); 
            color: #d1d1d1; 
            font-family: 'Cormorant Garamond', serif;
            cursor: none; /* Hide default cursor for custom one */
        }
        .cinzel { font-family: 'Cinzel', serif; }
        .gold-text { color: var(--gothic-gold); }
        .gold-border { border-color: rgba(197, 160, 89, 0.3); }
        
        /* Custom Cursor */
        #cursor-dot {
            width: 8px; height: 8px; background: var(--gothic-gold);
            position: fixed; pointer-events: none; z-index: 9999; border-radius: 50%;
        }
        #cursor-outline {
            width: 40px; height: 40px; border: 1px solid var(--gothic-gold);
            position: fixed; pointer-events: none; z-index: 9998; border-radius: 50%;
            transition: transform 0.15s ease-out;
        }

        /* Gothic Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: var(--gothic-gold); }

        .arch-frame {
            clip-path: ellipse(50% 100% at 50% 100%);
            border: 1px solid rgba(197, 160, 89, 0.2);
        }
        
        .overlay-dark { background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0.9)); }
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
        if(!this.orderData.name || !this.orderData.phoneno) return alert('Please provide your details');
        this.isSubmitting = true;
        try {
            const response = await fetch('/web/purchaseprodut', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...this.orderData, productId: this.selectedProduct._id, webid: this.webid })
            });
            if(response.ok) {
                alert('The pact is sealed. Order received.');
                this.selectedProduct = null;
                document.body.style.overflow = 'auto';
            }
        } finally { this.isSubmitting = false; }
    },

    async submitReview() {
        if(!this.reviewData.message) return;
        this.isSubmitting = true;
        try {
            const res = await fetch('/web/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: this.selectedProduct._id, review: { ...this.reviewData } })
            });
            if(res.ok) {
                this.selectedProduct.reviews.push({ ...this.reviewData });
                this.reviewData = { name: '', message: '' };
            }
        } finally { this.isSubmitting = false; }
    }
}">

    <div id="cursor-dot"></div>
    <div id="cursor-outline"></div>

    <nav class="fixed w-full z-50 px-10 py-6 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/5">
        <div class="cinzel text-xl tracking-[0.3em] gold-text font-bold">${brand.shopname}</div>
        <div class="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] cinzel">
            <a href="#collection" class="hover:text-white transition">Collections</a>
            <a href="#soul" class="hover:text-white transition">Our Soul</a>
            <a href="#contact" class="hover:text-white transition">Boutique</a>
        </div>
        <div class="flex items-center gap-6">
            <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-width="1.5"/></svg>
        </div>
    </nav>

    <header class="relative h-screen flex items-center justify-center text-center">
        <img src="${brand.shophomepageimg}" class="absolute inset-0 w-full h-full object-cover grayscale opacity-60">
        <div class="absolute inset-0 overlay-dark"></div>
        <div class="relative z-10 animate__animated animate__fadeIn">
            <h1 class="cinzel text-6xl md:text-9xl gold-text tracking-widest mb-4 font-bold">${brand.shopname}</h1>
            <p class="text-lg md:text-xl italic opacity-80 max-w-xl mx-auto mb-10 tracking-widest uppercase">Timeless artifacts from the shadows</p>
            <a href="#collection" class="cinzel border gold-border px-10 py-4 text-[10px] tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all">Explore the Reliquary</a>
        </div>
    </header>

    <section id="collection" class="py-32 px-6 max-w-7xl mx-auto">
        <div class="text-center mb-24">
            <span class="gold-text cinzel text-xs tracking-[0.5em] uppercase">The Collection</span>
            <h2 class="cinzel text-5xl mt-4 tracking-tighter uppercase font-bold text-white">The Reliquary</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            ${brand.shopProducts.map((p:any, i:any) => `
                <div @click="openProduct(${JSON.stringify(p).replace(/"/g, '&quot;')})" 
                     class="group cursor-pointer text-center animate__animated animate__fadeInUp" style="animation-delay: ${i * 0.2}s">
                    <div class="relative aspect-[3/4] overflow-hidden mb-8 border border-white/5 arch-frame">
                        <img src="${p.productmainphoto}" class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale hover:grayscale-0">
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span class="cinzel text-[10px] tracking-widest text-white border border-white px-4 py-2">Inspect Piece</span>
                        </div>
                    </div>
                    <h3 class="cinzel text-lg tracking-widest uppercase mb-2">${p.productname}</h3>
                                        <h3 class="cinzel text-lg tracking-widest uppercase mb-2">Price : ${p.price}</h3>

                    <p class="gold-text cinzel text-sm opacity-80 tracking-widest">$${p.productprice || 'Price on Request'}</p>
                </div>
            `).join('')}
        </div>
    </section>

    <section id="soul" class="py-32 bg-stone-950/50 border-y border-white/5">
        <div class="max-w-4xl mx-auto text-center px-6">
            <h2 class="cinzel gold-text text-4xl mb-8 tracking-widest">OUR SOUL</h2>
            <p class="text-2xl leading-relaxed italic font-light opacity-80 mb-12">
                "${brand.shopdescription}"
            </p>
            <div class="grid grid-cols-3 gap-8">
                <div class="text-center"><p class="cinzel text-[10px] tracking-widest uppercase opacity-50">Master Craft</p></div>
                <div class="text-center"><p class="cinzel text-[10px] tracking-widest uppercase opacity-50">Eternal Design</p></div>
                <div class="text-center"><p class="cinzel text-[10px] tracking-widest uppercase opacity-50">Gothic Lineage</p></div>
            </div>
        </div>
    </section>

    <div x-show="selectedProduct" x-cloak class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/98 backdrop-blur-xl" @click="selectedProduct = null; document.body.style.overflow='auto'"></div>
        
        <div class="relative bg-zinc-950 border border-white/10 w-full max-w-6xl h-[85vh] overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <button @click="selectedProduct = null; document.body.style.overflow='auto'" class="absolute top-6 right-6 z-20 text-white/50 hover:text-white transition">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="1.5"/></svg>
            </button>

            <div class="md:w-1/2 h-1/2 md:h-full bg-black/50 p-12 flex items-center justify-center">
                <img :src="selectedProduct?.productmainphoto" class="max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-700">
            </div>

            <div class="md:w-1/2 h-full overflow-y-auto p-12 border-l border-white/5">
                <div x-show="!isCheckout" class="animate__animated animate__fadeIn">
                    <h2 class="cinzel text-4xl gold-text mb-6 uppercase tracking-widest" x-text="selectedProduct?.productname"></h2>
                    <p class="text-lg italic opacity-70 mb-10 leading-loose" x-text="selectedProduct?.productdescription"></p>
                    
                    <button @click="isCheckout = true" class="w-full py-5 bg-stone-900 border border-amber-900/50 text-white cinzel tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all mb-12">
                        Initiate Ritual / Order
                    </button>

                    <div class="mt-12">
                        <h3 class="cinzel gold-text text-sm tracking-widest uppercase mb-8 border-b border-white/5 pb-2">Whispers from the Void (Reviews)</h3>
                        <div class="space-y-6 mb-10">
                            <template x-for="rev in selectedProduct?.reviews">
                                <div class="border-l border-amber-900/30 pl-4 py-1">
                                    <p class="italic text-white/80" x-text="'&ldquo;' + rev.message + '&rdquo;'"></p>
                                    <span class="cinzel text-[9px] uppercase tracking-widest opacity-40" x-text="rev.name"></span>
                                </div>
                            </template>
                        </div>
                        <form @submit.prevent="submitReview" class="space-y-4">
                            <input x-model="reviewData.name" type="text" placeholder="IDENTITY" class="w-full bg-transparent border border-white/10 p-4 cinzel text-[10px] focus:border-amber-900 outline-none">
                            <textarea x-model="reviewData.message" placeholder="YOUR TESTIMONY..." class="w-full bg-transparent border border-white/10 p-4 cinzel text-[10px] focus:border-amber-900 outline-none h-20"></textarea>
                            <button type="submit" class="text-[10px] cinzel tracking-widest gold-text uppercase hover:text-white transition">Leave a Mark</button>
                        </form>
                    </div>
                </div>

                <div x-show="isCheckout" class="animate__animated animate__fadeInRight">
                    <button @click="isCheckout = false" class="cinzel text-[10px] tracking-widest opacity-40 mb-10 uppercase">← Return to Artifact</button>
                    <h2 class="cinzel text-3xl mb-10 uppercase tracking-widest">Order Details</h2>
                    <form @submit.prevent="handlePurchase" class="space-y-6">
                        <input x-model="orderData.name" type="text" placeholder="NAME" required class="w-full bg-transparent border-b border-white/10 p-4 cinzel text-xs focus:border-amber-900 outline-none">
                        <input x-model="orderData.phoneno" type="tel" placeholder="CONTACT NUMBER" required class="w-full bg-transparent border-b border-white/10 p-4 cinzel text-xs focus:border-amber-900 outline-none">
                        <input x-model="orderData.email" type="email" placeholder="EMAIL ADDRESS" required class="w-full bg-transparent border-b border-white/10 p-4 cinzel text-xs focus:border-amber-900 outline-none">
                        <input x-model="orderData.location" type="text" placeholder="DESTINATION ADDRESS" required class="w-full bg-transparent border-b border-white/10 p-4 cinzel text-xs focus:border-amber-900 outline-none">
                        <button type="submit" :disabled="isSubmitting" class="w-full py-5 bg-white text-black cinzel tracking-[0.5em] font-bold uppercase">
                            <span x-text="isSubmitting ? 'TRANSMITTING...' : 'CONFIRM ACQUISITION'"></span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <footer class="py-20 border-t border-white/5 text-center">
        <h3 class="cinzel text-2xl gold-text mb-6">${brand.shopname}</h3>
        <p class="cinzel text-[10px] tracking-widest opacity-40 mb-4 uppercase">${brand.shopadress} • ${brand.city}</p>
        <div class="flex justify-center gap-8 mb-10">
            ${brand.shoplinks.map((s:any) => `<a href="${s.link}" class="cinzel text-[9px] tracking-widest uppercase opacity-60 hover:opacity-100 transition">Social</a>`).join('')}
        </div>
        <p class="text-[9px] cinzel opacity-30 tracking-[0.4em]">EST. MMXVI — ALL RIGHTS RESERVED</p>
    </footer>

    <script>
        // Custom Cursor Logic
        const dot = document.getElementById('cursor-dot');
        const outline = document.getElementById('cursor-outline');
        
        window.addEventListener('mousemove', (e) => {
            dot.style.left = e.clientX + 'px';
            dot.style.top = e.clientY + 'px';
            
            // Lagging outline effect
            outline.animate({
                left: (e.clientX - 20) + 'px',
                top: (e.clientY - 20) + 'px'
            }, { duration: 500, fill: 'forwards' });
        });

        // Hover effect for interactive elements
        const links = document.querySelectorAll('a, button, .cursor-pointer');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                outline.style.transform = 'scale(1.5)';
                outline.style.background = 'rgba(197, 160, 89, 0.1)';
            });
            link.addEventListener('mouseleave', () => {
                outline.style.transform = 'scale(1)';
                outline.style.background = 'transparent';
            });
        });
    </script>
</body>
</html>`;
}

};