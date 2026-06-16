const { createApp } = Vue;

const shops = [
  {
    id: 1,
    brand: "Kopi Lajur",
    area: "Kemang",
    tone: "shop-a",
    rating: "4.8",
    status: "subscribed",
    program: "10 Cups Personal",
    price: 189000,
    cups: 10,
    left: 6,
    period: "Monthly",
    product: "Hot Latte / Americano",
    limit: 200,
    sold: 142,
    description: "A flexible monthly pass for weekday coffee runs and slow weekend refills.",
  },
  {
    id: 2,
    brand: "Titik Seduh",
    area: "SCBD",
    tone: "shop-b",
    rating: "4.7",
    status: "available",
    program: "Office Daily 20",
    price: 4200000,
    cups: 420,
    left: 0,
    period: "30 days",
    product: "House Coffee",
    limit: 40,
    sold: 25,
    description: "Shared office allocation with 20 cups available every business day.",
  },
  {
    id: 3,
    brand: "Ruang Roastery",
    area: "Pondok Indah",
    tone: "shop-c",
    rating: "4.9",
    status: "available",
    program: "Weekend Filter Club",
    price: 155000,
    cups: 8,
    left: 0,
    period: "Monthly",
    product: "Manual Brew",
    limit: 120,
    sold: 79,
    description: "Eight manual brew cups for customers who like rotating single origins.",
  },
  {
    id: 4,
    brand: "Biji Kota",
    area: "Senopati",
    tone: "shop-d",
    rating: "4.6",
    status: "subscribed",
    program: "Espresso Sprint",
    price: 99000,
    cups: 7,
    left: 2,
    period: "Monthly",
    product: "Espresso Based",
    limit: 300,
    sold: 233,
    description: "Seven espresso based drinks for regulars who want simple prepaid value.",
  },
  {
    id: 5,
    brand: "Arunika Coffee",
    area: "Cipete",
    tone: "shop-e",
    rating: "4.8",
    status: "available",
    program: "Milk Coffee Pass",
    price: 149000,
    cups: 10,
    left: 0,
    period: "Monthly",
    product: "Es Kopi Susu",
    limit: 250,
    sold: 168,
    description: "A monthly iced milk coffee subscription for daily neighborhood pickup.",
  },
  {
    id: 6,
    brand: "Kedai Pagi",
    area: "Bintaro",
    tone: "shop-f",
    rating: "4.5",
    status: "available",
    program: "Morning Ten",
    price: 129000,
    cups: 10,
    left: 0,
    period: "Monthly",
    product: "Black Coffee",
    limit: 180,
    sold: 111,
    description: "Ten morning black coffees, redeemable before lunch across the month.",
  },
  {
    id: 7,
    brand: "Sela Kopi",
    area: "Blok M",
    tone: "shop-g",
    rating: "4.7",
    status: "available",
    program: "Team Brew 60",
    price: 1150000,
    cups: 60,
    left: 0,
    period: "Monthly",
    product: "Any Regular Cup",
    limit: 75,
    sold: 48,
    description: "A small team package for shared office pantries and client meetings.",
  },
  {
    id: 8,
    brand: "Noon Beans",
    area: "Kuningan",
    tone: "shop-h",
    rating: "4.4",
    status: "available",
    program: "Lunch Break Latte",
    price: 175000,
    cups: 9,
    left: 0,
    period: "Monthly",
    product: "Latte",
    limit: 160,
    sold: 96,
    description: "Nine latte redemptions for customers who step out between meetings.",
  },
  {
    id: 9,
    brand: "Teras Kopi",
    area: "Menteng",
    tone: "shop-i",
    rating: "4.8",
    status: "subscribed",
    program: "Classic 12",
    price: 219000,
    cups: 12,
    left: 9,
    period: "Monthly",
    product: "Classic Menu",
    limit: 220,
    sold: 187,
    description: "Twelve classic cups for customers who rotate between black and milk coffee.",
  },
  {
    id: 10,
    brand: "Dua Derajat",
    area: "Gandaria",
    tone: "shop-j",
    rating: "4.6",
    status: "available",
    program: "Cold Brew Pack",
    price: 168000,
    cups: 8,
    left: 0,
    period: "Monthly",
    product: "Cold Brew",
    limit: 140,
    sold: 82,
    description: "Eight cold brews for commuters who want pickup-ready bottles.",
  },
];

const products = [
  { id: 1, name: "Hot Latte", basePrice: 28000, category: "Milk Coffee" },
  { id: 2, name: "Iced Americano", basePrice: 24000, category: "Black Coffee" },
  { id: 3, name: "Manual Brew", basePrice: 36000, category: "Filter" },
  { id: 4, name: "Es Kopi Susu", basePrice: 22000, category: "Signature" },
  { id: 5, name: "Cold Brew Bottle", basePrice: 32000, category: "Ready To Go" },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

createApp({
  data() {
    const route = window.location.hash.replace("#", "");
    return {
      mode: ["tenant", "programs", "products", "subscriptions", "revenue", "config"].includes(route) ? "tenant" : "customer",
      customerScreen: ["detail", "redeem", "profile"].includes(route) ? route : "discover",
      tenantScreen: ["programs", "products", "subscriptions", "revenue", "config"].includes(route) ? route : "dashboard",
      shops,
      products,
      selectedShopId: 1,
      activeConfigId: 1,
      redeemCode: "482917",
    };
  },
  computed: {
    selectedShop() {
      return this.shops.find((shop) => shop.id === this.selectedShopId) || this.shops[0];
    },
    activeConfig() {
      return this.shops.find((shop) => shop.id === this.activeConfigId) || this.shops[0];
    },
    subscriptions() {
      return this.shops.filter((shop) => shop.status === "subscribed");
    },
    tenantTotals() {
      const subscribers = this.shops.reduce((sum, shop) => sum + shop.sold, 0);
      const cupCapacity = this.shops.reduce((sum, shop) => sum + shop.sold * shop.cups, 0);
      const revenue = this.shops.reduce((sum, shop) => sum + shop.sold * shop.price, 0);
      return { subscribers, cupCapacity, revenue };
    },
    tenantPrograms() {
      return this.shops.slice(0, 5);
    },
  },
  methods: {
    currency: formatCurrency,
    openDetail(shop) {
      this.selectedShopId = shop.id;
      this.customerScreen = "detail";
    },
    openRedeem(shop) {
      this.selectedShopId = shop.id;
      this.customerScreen = "redeem";
    },
    openConfig(shop) {
      this.activeConfigId = shop.id;
      this.tenantScreen = "config";
    },
    setSubscribed(shop) {
      shop.status = "subscribed";
      shop.left = Math.max(shop.left, shop.cups);
    },
    capacityPercent(shop) {
      return Math.min(100, Math.round((shop.sold / shop.limit) * 100));
    },
    qrCell(index) {
      const pattern = [0, 2, 3, 5, 6, 9, 11, 12, 15, 17, 20, 21, 22, 24, 27, 29, 30, 33, 35, 36, 39, 40, 42, 45, 47, 48, 51, 53, 54, 57, 59, 60];
      return pattern.includes((index * 7 + 3) % 61);
    },
  },
  template: `
    <div class="app-shell" :class="mode">
      <header class="topbar">
        <button class="brand-lockup" @click="mode = 'customer'">
          <span class="brand-mark">JN</span>
          <span>
            <strong>Jatah Ngopi</strong>
            <small>Loyalty cups marketplace</small>
          </span>
        </button>
        <nav class="mode-switch" aria-label="Prototype mode">
          <button :class="{ active: mode === 'customer' }" @click="mode = 'customer'">Customer</button>
          <button :class="{ active: mode === 'tenant' }" @click="mode = 'tenant'">Tenant</button>
        </nav>
      </header>

      <main v-if="mode === 'customer'" class="customer-stage">
        <section class="phone-frame">
          <div class="phone-status">
            <span>09:41</span>
            <span>Jatah Ngopi</span>
          </div>

          <div v-if="customerScreen === 'discover'" class="screen scroll-screen">
            <div class="mobile-hero">
              <p>Jakarta coffee passes</p>
              <h1>Find your next cup plan.</h1>
            </div>
            <div class="search-pill">
              <span class="search-icon"></span>
              <span>Search shops, areas, programs</span>
            </div>
            <div class="program-grid">
              <article v-for="shop in shops" :key="shop.id" class="program-card" @click="openDetail(shop)">
                <div class="shop-photo" :class="shop.tone">
                  <span>{{ shop.brand.split(' ').map(word => word[0]).join('') }}</span>
                </div>
                <div class="program-body">
                  <div class="row-between">
                    <strong>{{ shop.brand }}</strong>
                    <span class="rating">{{ shop.rating }}</span>
                  </div>
                  <p>{{ shop.area }} · {{ shop.program }}</p>
                  <div class="row-between">
                    <span class="price">{{ currency(shop.price) }}</span>
                    <span class="chip" :class="shop.status">{{ shop.status === 'subscribed' ? 'Active' : shop.cups + ' cups' }}</span>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div v-if="customerScreen === 'detail'" class="screen detail-screen">
            <button class="back-button" @click="customerScreen = 'discover'">Back</button>
            <div class="detail-photo" :class="selectedShop.tone">
              <span>{{ selectedShop.brand }}</span>
            </div>
            <div class="detail-content">
              <div class="row-between top-align">
                <div>
                  <p class="eyebrow">{{ selectedShop.area }}</p>
                  <h1>{{ selectedShop.program }}</h1>
                </div>
                <span class="status-pill" :class="selectedShop.status">{{ selectedShop.status === 'subscribed' ? 'Subscribed' : 'Open' }}</span>
              </div>
              <p class="description">{{ selectedShop.description }}</p>
              <div class="detail-metrics">
                <div><strong>{{ selectedShop.cups }}</strong><span>Cups</span></div>
                <div><strong>{{ selectedShop.period }}</strong><span>Valid</span></div>
                <div><strong>{{ selectedShop.product }}</strong><span>Product</span></div>
              </div>
              <div class="price-panel">
                <span>Program price</span>
                <strong>{{ currency(selectedShop.price) }}</strong>
              </div>
              <button v-if="selectedShop.status !== 'subscribed'" class="primary-action" @click="setSubscribed(selectedShop)">Subscribe</button>
              <button v-else class="primary-action" @click="openRedeem(selectedShop)">Redeem cup</button>
            </div>
          </div>

          <div v-if="customerScreen === 'redeem'" class="screen redeem-screen">
            <button class="back-button" @click="customerScreen = 'detail'">Back</button>
            <div class="redeem-header">
              <p>{{ selectedShop.brand }}</p>
              <h1>{{ selectedShop.product }}</h1>
            </div>
            <div class="qr-wrap">
              <div class="qr-grid" aria-label="QR code mockup">
                <span v-for="cell in 64" :key="cell" :class="{ dark: qrCell(cell) }"></span>
              </div>
            </div>
            <div class="redeem-code">
              <span>Redemption number</span>
              <strong>{{ redeemCode }}</strong>
            </div>
            <div class="remaining-strip">
              <span>{{ selectedShop.left }} cups left</span>
              <button @click="selectedShop.left = Math.max(0, selectedShop.left - 1)">Mark redeemed</button>
            </div>
          </div>

          <div v-if="customerScreen === 'profile'" class="screen scroll-screen profile-screen">
            <div class="profile-head">
              <div class="avatar">BB</div>
              <div>
                <h1>Bobby</h1>
                <p>3 active subscriptions</p>
              </div>
            </div>
            <article v-for="shop in subscriptions" :key="shop.id" class="subscription-card">
              <div>
                <strong>{{ shop.brand }}</strong>
                <p>{{ shop.program }}</p>
              </div>
              <div class="cup-meter">
                <span>{{ shop.left }}/{{ shop.cups }}</span>
                <div><i :style="{ width: (shop.left / shop.cups * 100) + '%' }"></i></div>
              </div>
              <button @click="openRedeem(shop)">Redeem</button>
            </article>
          </div>

          <nav class="mobile-tabs">
            <button :class="{ active: customerScreen === 'discover' }" @click="customerScreen = 'discover'"><span class="tab-icon discover-icon"></span>Discover</button>
            <button :class="{ active: customerScreen === 'redeem' }" @click="openRedeem(subscriptions[0] || shops[0])"><span class="tab-icon qr-icon"></span>Redeem</button>
            <button :class="{ active: customerScreen === 'profile' }" @click="customerScreen = 'profile'"><span class="tab-icon user-icon"></span>Profile</button>
          </nav>
        </section>
      </main>

      <main v-else class="tenant-stage">
        <aside class="sidebar">
          <div class="store-profile">
            <div class="store-logo">KL</div>
            <div>
              <strong>Kopi Lajur</strong>
              <span>Kemang flagship</span>
            </div>
          </div>
          <button :class="{ active: tenantScreen === 'dashboard' }" @click="tenantScreen = 'dashboard'">Dashboard</button>
          <button :class="{ active: tenantScreen === 'programs' }" @click="tenantScreen = 'programs'">Loyalty Programs</button>
          <button :class="{ active: tenantScreen === 'products' }" @click="tenantScreen = 'products'">Products</button>
          <button :class="{ active: tenantScreen === 'subscriptions' }" @click="tenantScreen = 'subscriptions'">Subscriptions</button>
          <button :class="{ active: tenantScreen === 'revenue' }" @click="tenantScreen = 'revenue'">Revenue</button>
        </aside>

        <section class="tenant-content">
          <div v-if="tenantScreen === 'dashboard'" class="tenant-screen">
            <div class="page-title">
              <p>Store dashboard</p>
              <h1>Kopi Lajur marketing console</h1>
            </div>
            <div class="metric-grid">
              <article><span>Total subscribers</span><strong>{{ tenantTotals.subscribers }}</strong></article>
              <article><span>Cup allocation sold</span><strong>{{ tenantTotals.cupCapacity }}</strong></article>
              <article><span>Collected revenue</span><strong>{{ currency(tenantTotals.revenue) }}</strong></article>
            </div>
            <section class="wide-panel">
              <div class="panel-head">
                <h2>Store profile</h2>
                <button>Update</button>
              </div>
              <div class="profile-grid">
                <label>Store name<input value="Kopi Lajur" /></label>
                <label>Primary area<input value="Kemang, Jakarta Selatan" /></label>
                <label>Contact<input value="hello@kopilajur.id" /></label>
                <label>Status<select><option>Accepting subscribers</option><option>Paused</option></select></label>
              </div>
            </section>
          </div>

          <div v-if="tenantScreen === 'programs'" class="tenant-screen">
            <div class="panel-head page-head">
              <div><p>Loyalty programs</p><h1>Program index</h1></div>
              <button>Create program</button>
            </div>
            <div class="table-card">
              <table>
                <thead><tr><th>Name</th><th>Product</th><th>Cups</th><th>Sold</th><th>Cap</th><th></th></tr></thead>
                <tbody>
                  <tr v-for="program in tenantPrograms" :key="program.id">
                    <td><strong>{{ program.program }}</strong><span>{{ program.description }}</span></td>
                    <td>{{ program.product }}</td>
                    <td>{{ program.cups }}</td>
                    <td>{{ program.sold }}</td>
                    <td>{{ program.limit }}</td>
                    <td><button @click="openConfig(program)">Configure</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="tenantScreen === 'config'" class="tenant-screen">
            <div class="page-title">
              <p>Program config</p>
              <h1>{{ activeConfig.program }}</h1>
            </div>
            <section class="wide-panel config-panel">
              <label>Program name<input v-model="activeConfig.program" /></label>
              <label>Description<textarea v-model="activeConfig.description"></textarea></label>
              <div class="form-grid">
                <label>Cups per subscription<input type="number" v-model.number="activeConfig.cups" /></label>
                <label>Product name<input v-model="activeConfig.product" /></label>
                <label>Program quantity to sell<input type="number" v-model.number="activeConfig.limit" /></label>
                <label>Expiry date<input value="2026-07-31" type="date" /></label>
                <label>Price<input :value="activeConfig.price" type="number" /></label>
                <label>Program slug<input :value="activeConfig.brand.toLowerCase().replaceAll(' ', '-') + '-' + activeConfig.id" /></label>
              </div>
              <div class="capacity-row">
                <span>{{ activeConfig.sold }} of {{ activeConfig.limit }} subscriptions sold</span>
                <div><i :style="{ width: capacityPercent(activeConfig) + '%' }"></i></div>
              </div>
            </section>
          </div>

          <div v-if="tenantScreen === 'products'" class="tenant-screen">
            <div class="panel-head page-head">
              <div><p>Products</p><h1>Coffee product index</h1></div>
              <button>Add product</button>
            </div>
            <div class="product-list">
              <article v-for="product in products" :key="product.id">
                <div>
                  <strong>{{ product.name }}</strong>
                  <span>{{ product.category }}</span>
                </div>
                <strong>{{ currency(product.basePrice) }}</strong>
              </article>
            </div>
          </div>

          <div v-if="tenantScreen === 'subscriptions'" class="tenant-screen">
            <div class="page-title">
              <p>Subscriptions</p>
              <h1>Cups sold by program</h1>
            </div>
            <div class="bar-panel">
              <div v-for="program in tenantPrograms" :key="program.id" class="bar-row">
                <span>{{ program.program }}</span>
                <div><i :style="{ width: capacityPercent(program) + '%' }"></i></div>
                <strong>{{ program.sold * program.cups }} cups</strong>
              </div>
            </div>
          </div>

          <div v-if="tenantScreen === 'revenue'" class="tenant-screen">
            <div class="page-title">
              <p>Revenue</p>
              <h1>Collected by loyalty sales</h1>
            </div>
            <div class="metric-grid">
              <article><span>This month</span><strong>{{ currency(tenantTotals.revenue) }}</strong></article>
              <article><span>Average package</span><strong>{{ currency(Math.round(tenantTotals.revenue / tenantTotals.subscribers)) }}</strong></article>
              <article><span>Programs live</span><strong>{{ tenantPrograms.length }}</strong></article>
            </div>
            <div class="table-card">
              <table>
                <thead><tr><th>Program</th><th>Subscribers</th><th>Gross collected</th><th>Fill rate</th></tr></thead>
                <tbody>
                  <tr v-for="program in tenantPrograms" :key="program.id">
                    <td><strong>{{ program.program }}</strong></td>
                    <td>{{ program.sold }}</td>
                    <td>{{ currency(program.sold * program.price) }}</td>
                    <td>{{ capacityPercent(program) }}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
}).mount("#app");
