<template>
  <div class="app-wrapper">
    <!-- Top Navbar -->
    <nav class="navbar navbar-expand-lg shadow-sm glassy-nav fixed-top rounded-3 mx-3 mt-3">
      <div class="container-fluid">
        <!-- Brand Logo and Name, links to Home -->
        <router-link class="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src="./assets/logo.png" alt="IndieVault Logo" height="28" />
          <span class="fw-bold">IndieVault</span>
        </router-link>

        <!-- Hamburger menu toggle for mobile -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <!-- Main links -->
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/games">Games</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/news">News</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>

            <!-- When not logged in -->
            <template v-if="!isLoggedIn">
              <li class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
              </li>
            </template>

            <!-- When logged in -->
            <template v-else>
              <li class="nav-item d-flex align-items-center gap-2">
                <router-link class="nav-link user-name" to="/profile">
                  Hi, {{ currentUser.name }}
                </router-link>
                <button class="btn btn-sm btn-outline-light" @click="logout">
                  Logout
                </button>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main view content rendered based on current route -->
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import auth from './store/auth'

export default {
  name: 'App',
  setup() {
    const isLoggedIn = computed(() => auth.isLoggedIn.value)
    const currentUser = computed(() => auth.state.currentUser)
    const router = useRouter()

    const logout = () => {
      auth.logout()
      router.push('/')
      window.location.reload()
    }

    return {
      auth,
      isLoggedIn,
      currentUser,
      logout
    }
  }
}
</script>

<style>
/* Global Page Background */
body {
  margin: 0;
  padding: 0;
}

.app-wrapper {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #1e1e2f, #2c2c38);
  /* dark theme gradient */
  padding-top: 80px;
  /* space for fixed navbar */
}

/* Glassy Navbar Style */
.glassy-nav {
  background: rgba(255, 255, 255, 0.08);
  /* semi-transparent white */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  /* subtle border */
}

/* Navigation Link Styling */
.navbar-brand,
.nav-link {
  color: white !important;
  font-weight: 500;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
  /* subtle glow for contrast */
  border-radius: 10px;
  /* slightly rounded edges */
  padding: 6px 16px;
  transition: all 0.3s ease;
}

/* Highlight active or hovered links */
.nav-link:hover,
.router-link-exact-active.nav-link {
  background-color: rgba(255, 255, 255, 0.1);
  /* soft highlight */
  color: white !important;
  text-decoration: none !important;
}

/* Hamburger Menu Button Style */
.navbar-toggler {
  border: none;
  outline: none !important;
  box-shadow: none !important;
  padding: 0.25rem 0.5rem;
}

/* Ensure hamburger icon is visible on dark backgrounds */
.navbar-toggler-icon {
  filter: brightness(0) invert(1);
}

/* Mobile-Specific Styling */
@media (max-width: 991.98px) {
  .navbar-collapse {
    padding-left: 1.5rem;
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
    /* highlight nav items on mobile */
    color: white !important;
  }
}
</style>