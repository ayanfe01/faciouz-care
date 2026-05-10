/* ─── Faciouz Care — Data Layer (Supabase) ─── */
const FC = (() => {
  const SUPABASE_URL = 'https://mqdowpilrhbdvgyspfol.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xZG93cGlscmhiZHZneXNwZm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNjQ0MTgsImV4cCI6MjA5Mzk0MDQxOH0.rpJ1VeufHo19uwqaPHYSUfM-t5UQK4fpmJOu9mwDwIs';
  const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  const BUCKET = 'food-photos';

  let _menu = [];
  let _info = {};
  let _password = 'faciouz2026';

  const DEFAULT_INFO = {
    restaurantName: 'Faciouz Care',
    tagline: "it's all about satisfaction!",
    phone: '07069401415 / 08033648400',
    email: 'hello@faciouzcare.com',
    address: '6, Ajose Str., Off PPL Bus Stop, Behind Sebele Hotel | 12, Maria Subulade Street, Itele Road, Ota, Ogun State',
    instagram: '#', facebook: '#', twitter: '#',
    hours: { weekday: '9:00 AM – 10:00 PM', saturday: '8:00 AM – 11:00 PM', sunday: '10:00 AM – 9:00 PM', holiday: '10:00 AM – 8:00 PM' },
    deliveryFee: 500, minOrder: 0,
  };

  const DEFAULT_MENU = [
    { category: 'swallows', name: 'Amala', description: 'Smooth yam flour swallow served with ewedu, gbegiri, or egusi soup.', price: 800, emoji: '🍲', bg: 'linear-gradient(135deg,#3D1A00,#6B3200)', img: '', tag: 'Best Seller', featured: true, available: true },
    { category: 'swallows', name: 'Pounded Yam', description: 'Classic hand-pounded yam — fluffy and perfect with any Nigerian soup.', price: 900, emoji: '🫙', bg: 'linear-gradient(135deg,#4A2000,#8B4513)', img: '', tag: 'Classic', featured: true, available: true },
    { category: 'swallows', name: 'Eba (Garri)', description: 'Classic cassava swallow with a firm, satisfying texture.', price: 700, emoji: '🌽', bg: 'linear-gradient(135deg,#5C4A1A,#9B7D2E)', img: '', tag: '', featured: false, available: true },
    { category: 'swallows', name: 'Semovita', description: 'Light and smooth semolina swallow — great with egusi or bitterleaf.', price: 750, emoji: '🟢', bg: 'linear-gradient(135deg,#2E4A1A,#4E7D2E)', img: '', tag: '', featured: false, available: true },
    { category: 'rice', name: 'Party Jollof Rice', description: 'Smoky, rich Nigerian party rice with tomatoes and peppers. Served with chicken or beef.', price: 2000, emoji: '🍛', bg: 'linear-gradient(135deg,#C0390A,#E8650A)', img: '', tag: 'Popular', featured: true, available: true },
    { category: 'rice', name: 'Special Fried Rice', description: 'Fragrant fried rice with vegetables, shrimp, and your choice of chicken or beef.', price: 2200, emoji: '🍚', bg: 'linear-gradient(135deg,#7A6000,#C4A000)', img: '', tag: "Chef's Pick", featured: true, available: true },
    { category: 'rice', name: 'Ofada Rice & Stew', description: 'Local brown ofada rice with spicy ofada sauce and assorted offals.', price: 2500, emoji: '🍱', bg: 'linear-gradient(135deg,#8B4513,#C0390A)', img: '', tag: '', featured: false, available: true },
    { category: 'rice', name: 'White Rice & Stew', description: 'Fluffy plain white rice with rich homemade tomato stew and protein of your choice.', price: 1800, emoji: '🍽️', bg: 'linear-gradient(135deg,#1B4A6B,#2D7D9B)', img: '', tag: '', featured: false, available: true },
    { category: 'soups', name: 'Egusi Soup', description: 'Melon seed soup with palm oil, assorted meats, dried fish, and leafy greens.', price: 1500, emoji: '🥣', bg: 'linear-gradient(135deg,#1B6B2F,#2D9147)', img: '', tag: 'Traditional', featured: true, available: true },
    { category: 'soups', name: 'Ewedu Soup', description: 'Silky jute leaf soup — traditionally enjoyed with Amala and Gbegiri stew.', price: 1000, emoji: '🌿', bg: 'linear-gradient(135deg,#1B4A1A,#2D7D2E)', img: '', tag: '', featured: false, available: true },
    { category: 'soups', name: 'Ogbono Soup', description: 'Draw soup made from wild mango seeds with leafy greens and assorted proteins.', price: 1500, emoji: '🟤', bg: 'linear-gradient(135deg,#4A1A00,#8B3A00)', img: '', tag: '', featured: false, available: true },
    { category: 'soups', name: 'Pepper Soup', description: 'Aromatic, spicy broth with catfish, goat meat, or assorted — Nigerian comfort in a bowl.', price: 3000, emoji: '🍖', bg: 'linear-gradient(135deg,#8B0000,#CC2200)', img: '', tag: 'Spicy 🌶️', featured: true, available: true },
    { category: 'soups', name: 'Bitterleaf Soup', description: 'Classic Igbo bitterleaf soup with cocoyam thickener, palm oil, and assorted meats.', price: 1600, emoji: '🥬', bg: 'linear-gradient(135deg,#2D4A1A,#4E7D2E)', img: '', tag: '', featured: false, available: true },
    { category: 'protein', name: 'Grilled Chicken', description: 'Juicy whole chicken marinated in house spices and flame-grilled to smoky perfection.', price: 3500, emoji: '🍗', bg: 'linear-gradient(135deg,#5C1A00,#A03000)', img: '', tag: '', featured: false, available: true },
    { category: 'protein', name: 'Suya (Beef Skewers)', description: 'Spiced beef skewers with groundnut powder seasoning — the iconic Nigerian street snack.', price: 2000, emoji: '🥩', bg: 'linear-gradient(135deg,#3A1A00,#6B3200)', img: '', tag: '', featured: false, available: true },
    { category: 'protein', name: 'Fried/Grilled Fish', description: 'Fresh river or sea fish seasoned with Nigerian spices and fried or grilled to order.', price: 2500, emoji: '🐟', bg: 'linear-gradient(135deg,#1A3A6B,#2D6B9B)', img: '', tag: '', featured: false, available: true },
    { category: 'drinks', name: 'Zobo (Hibiscus Drink)', description: 'Chilled hibiscus drink infused with ginger, cloves, and pineapple.', price: 500, emoji: '🥤', bg: 'linear-gradient(135deg,#8B0033,#CC0055)', img: '', tag: '', featured: false, available: true },
    { category: 'drinks', name: 'Kunu (Millet Drink)', description: 'Traditional northern Nigerian fermented millet drink — smooth and nourishing.', price: 500, emoji: '🌾', bg: 'linear-gradient(135deg,#1B6B2F,#2D9147)', img: '', tag: '', featured: false, available: true },
    { category: 'drinks', name: 'Fresh Fruit Juice', description: 'Seasonal fresh-squeezed juice — orange, watermelon, pineapple, or mixed tropical.', price: 700, emoji: '🍊', bg: 'linear-gradient(135deg,#E8650A,#FF8C38)', img: '', tag: '', featured: false, available: true },
    { category: 'extras', name: 'Moi Moi', description: 'Steamed bean pudding with peppers, onions, and egg or fish — soft and savoury.', price: 600, emoji: '🧆', bg: 'linear-gradient(135deg,#C0390A,#E87038)', img: '', tag: '', featured: false, available: true },
    { category: 'extras', name: 'Fried Plantain (Dodo)', description: 'Sweet ripe plantain slices fried golden — the perfect side to any Nigerian meal.', price: 500, emoji: '🍟', bg: 'linear-gradient(135deg,#7A6000,#C4A000)', img: '', tag: '', featured: false, available: true },
    { category: 'extras', name: 'Akara (Bean Cakes)', description: 'Fluffy deep-fried bean fritters seasoned with peppers and onions.', price: 400, emoji: '🍘', bg: 'linear-gradient(135deg,#4A1A00,#8B3A00)', img: '', tag: '', featured: false, available: true },
  ];

  const toItem = r => ({
    id: r.id,
    category: r.category,
    name: r.name,
    desc: r.description,
    price: r.price,
    emoji: r.emoji,
    bg: r.bg,
    img: r.img || '',
    tag: r.tag || '',
    featured: r.featured,
    available: r.available,
  });

  const toRow = i => ({
    category: i.category,
    name: i.name,
    description: i.desc || i.description || '',
    price: i.price,
    emoji: i.emoji || '🍽️',
    bg: i.bg || 'linear-gradient(135deg,#555,#888)',
    img: i.img || '',
    tag: i.tag || '',
    featured: !!i.featured,
    available: !!i.available,
  });

  return {
    // ── Init: call once on every page before using any FC methods ──
    async init() {
      const [menuRes, infoRes, passRes] = await Promise.all([
        sb.from('menu_items').select('*').order('id'),
        sb.from('settings').select('value').eq('key', 'info').maybeSingle(),
        sb.from('settings').select('value').eq('key', 'password').maybeSingle(),
      ]);

      if (menuRes.data && menuRes.data.length > 0) {
        _menu = menuRes.data.map(toItem);
      } else {
        const { data: seeded } = await sb.from('menu_items').insert(DEFAULT_MENU).select();
        _menu = (seeded || []).map(toItem);
      }

      _info = infoRes?.data?.value ? { ...DEFAULT_INFO, ...infoRes.data.value } : { ...DEFAULT_INFO };
      _password = passRes?.data?.value || 'faciouz2026';
    },

    // ── Menu (reads from memory cache) ──
    getMenu: () => _menu,

    async addMenuItem(item) {
      const { data, error } = await sb.from('menu_items').insert(toRow(item)).select().single();
      if (error) throw error;
      const newItem = toItem(data);
      _menu.push(newItem);
      return newItem;
    },

    async updateMenuItem(id, patch) {
      const existing = _menu.find(i => i.id === id) || {};
      const { error } = await sb.from('menu_items').update(toRow({ ...existing, ...patch })).eq('id', id);
      if (error) throw error;
      _menu = _menu.map(i => i.id === id ? { ...i, ...patch } : i);
    },

    async deleteMenuItem(id) {
      const { error } = await sb.from('menu_items').delete().eq('id', id);
      if (error) throw error;
      _menu = _menu.filter(i => i.id !== id);
    },

    async resetMenu() {
      await sb.from('menu_items').delete().gt('id', 0);
      const { data } = await sb.from('menu_items').insert(DEFAULT_MENU).select();
      _menu = (data || []).map(toItem);
    },

    // ── Info ──
    getInfo: () => _info,
    async saveInfo(info) {
      _info = { ..._info, ...info };
      await sb.from('settings').upsert({ key: 'info', value: _info });
    },

    // ── Reservations ──
    async getReservations() {
      const { data } = await sb.from('reservations').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    async saveReservation(res) {
      const { error } = await sb.from('reservations').insert({ ...res, status: 'pending' });
      if (error) throw error;
    },
    async updateReservation(id, patch) {
      await sb.from('reservations').update(patch).eq('id', id);
    },
    async deleteReservation(id) {
      await sb.from('reservations').delete().eq('id', id);
    },

    // ── Orders ──
    async getOrders() {
      const { data } = await sb.from('orders').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    async saveOrder(order) {
      const { error } = await sb.from('orders').insert({ ...order, status: 'new' });
      if (error) throw error;
    },
    async updateOrder(id, patch) {
      await sb.from('orders').update(patch).eq('id', id);
    },
    async deleteOrder(id) {
      await sb.from('orders').delete().eq('id', id);
    },

    // ── Messages ──
    async getMessages() {
      const { data } = await sb.from('messages').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    async saveMessage(msg) {
      const { error } = await sb.from('messages').insert({ ...msg, read: false });
      if (error) throw error;
    },
    async markMessageRead(id) {
      await sb.from('messages').update({ read: true }).eq('id', id);
    },
    async deleteMessage(id) {
      await sb.from('messages').delete().eq('id', id);
    },

    // ── Clear all inbox data ──
    async clearInbox() {
      await Promise.all([
        sb.from('reservations').delete().gt('id', 0),
        sb.from('orders').delete().gt('id', 0),
        sb.from('messages').delete().gt('id', 0),
      ]);
    },

    // ── Reviews ──
    async getReviews(dishName) {
      const q = sb.from('reviews').select('*').order('created_at', { ascending: false });
      if (dishName) q.eq('dish', dishName);
      const { data } = await q;
      return data || [];
    },
    async addReview(review) {
      const { error } = await sb.from('reviews').insert(review);
      if (error) throw error;
    },
    async deleteReview(id) {
      await sb.from('reviews').delete().eq('id', id);
    },
    async getAverageRatings() {
      const { data } = await sb.from('reviews').select('dish, rating');
      if (!data || data.length === 0) return {};
      const map = {};
      data.forEach(r => {
        if (!map[r.dish]) map[r.dish] = { sum: 0, count: 0 };
        map[r.dish].sum += r.rating;
        map[r.dish].count++;
      });
      const result = {};
      Object.entries(map).forEach(([dish, { sum, count }]) => {
        result[dish] = { avg: (sum / count).toFixed(1), count };
      });
      return result;
    },

    // ── Gallery ──
    async getGalleryPhotos() {
      const { data } = await sb.from('gallery_photos').select('*').order('created_at', { ascending: false });
      return data || [];
    },
    async addGalleryPhoto(url, caption) {
      const { data, error } = await sb.from('gallery_photos').insert({ url, caption }).select().single();
      if (error) throw error;
      return data;
    },
    async deleteGalleryPhoto(id) {
      const { error } = await sb.from('gallery_photos').delete().eq('id', id);
      if (error) throw error;
    },

    // ── Realtime ──
    subscribeToInbox(callbacks) {
      return sb.channel('admin-inbox')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' },
          p => callbacks.onOrder && callbacks.onOrder(p.new))
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reservations' },
          p => callbacks.onReservation && callbacks.onReservation(p.new))
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' },
          p => callbacks.onMessage && callbacks.onMessage(p.new))
        .subscribe();
    },

    // ── Auth (session flag stays in localStorage) ──
    getPassword: () => _password,
    async setPassword(pw) {
      _password = pw;
      await sb.from('settings').upsert({ key: 'password', value: pw });
    },
    login(pw) {
      if (pw === _password) { localStorage.setItem('fc_session', 'true'); return true; }
      return false;
    },
    logout() { localStorage.removeItem('fc_session'); },
    isLoggedIn: () => localStorage.getItem('fc_session') === 'true',

    // ── Photo upload to Supabase Storage ──
    async uploadPhoto(file) {
      return this.uploadFile(file, 'dishes');
    },
    async uploadFile(file, folder) {
      const ext = file.type === 'image/png' ? 'png' : 'jpg';
      const path = `${folder}/${Date.now()}.${ext}`;
      const { error } = await sb.storage.from(BUCKET).upload(path, file, { contentType: file.type, upsert: true });
      if (error) throw error;
      const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
      return data.publicUrl;
    },

    // ── Utils ──
    formatPrice: n => '₦' + Number(n).toLocaleString(),
    formatDate: iso => new Date(iso).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' }),
    CATEGORIES: [
      { id: 'swallows', label: 'Swallows' },
      { id: 'rice', label: 'Rice Dishes' },
      { id: 'soups', label: 'Soups' },
      { id: 'protein', label: 'Protein' },
      { id: 'drinks', label: 'Drinks' },
      { id: 'extras', label: 'Extras' },
    ],
  };
})();
