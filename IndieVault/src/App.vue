<template>
  <div class="app-wrapper">
    <!-- Modern Glassy Navbar -->
    <nav class="navbar navbar-expand-lg shadow-sm glassy-nav fixed-top rounded-3 mx-3 mt-3">
      <div class="container-fluid">
        <router-link class="navbar-brand fw-bold" to="/">IndieVault</router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/news">News</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Page content -->
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* ===== Page background ===== */
body {
  margin: 0;
  padding: 0;
}

.app-wrapper {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #1e1e2f, #2c2c38);
  padding-top: 80px;
}

/* ===== Glassy Navbar ===== */
.glassy-nav {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* ===== Navbar Link Styling ===== */
.navbar-brand,
.nav-link {
  color: white !important;
  font-weight: 500;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  /* pill shape */
  padding: 6px 16px;
  transition: all 0.3s ease;
}

/* Hover or active state */
.nav-link:hover,
.router-link-exact-active.nav-link {
  background-color: rgba(255, 255, 255, 0.1);
  color: white !important;
  text-decoration: none !important;
}

/* Remove outline around hamburger button */
.navbar-toggler {
  border: none;
  outline: none !important;
  box-shadow: none !important;
  padding: 0.25rem 0.5rem;
}

/* Hamburger icon visibility on dark background */
.navbar-toggler-icon {
  filter: brightness(0) invert(1);
}

/* Align dropdown items with brand on mobile */
@media (max-width: 991.98px) {
  .navbar-collapse {
    padding-left: 1.5rem;
    /* Match brand’s natural position */
  }

  .navbar-nav .nav-link {
    display: block;
    width: fit-content;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }

  .navbar-nav .nav-link:hover,
  .navbar-nav .router-link-exact-active.nav-link {
    background-color: rgba(255, 255, 255, 0.12);
    color: white !important;
  }
}
</style>