export const generateShopHtml = (brand: any) => {
  const webId = brand._id;

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
};