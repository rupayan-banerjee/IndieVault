<template>
    <div class="about">
        <!-- Hero-like header -->
        <section class="hero-section text-center py-5">
            <div class="container">
                <h2 class="display-5 fw-bold hero-title">About IndieVault</h2>
                <p class="lead hero-subtext">
                    IndieVault is your hub for discovering new indie games, reading the latest dev news, and connecting
                    with fellow creators and players around the world.
                </p>
            </div>
        </section>

        <!-- Form + interaction box -->
        <section class="py-4">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="glass-card p-4">
                            <form @submit.prevent>
                                <div class="mb-3">
                                    <label for="firstName" class="form-label">First Name</label>
                                    <input id="firstName" v-model="firstName" type="text"
                                        class="form-control custom-input" />
                                </div>

                                <div class="mb-3">
                                    <label for="lastName" class="form-label">Last Name</label>
                                    <input id="lastName" v-model="lastName" type="text"
                                        class="form-control custom-input" />
                                </div>
                            </form>

                            <!-- Dynamic welcome message -->
                            <div class="alert alert-primary mt-4" v-if="fullName">
                                👋 Welcome, {{ fullName }}!
                            </div>

                            <!-- Radio selection -->
                            <div class="mt-4">
                                <p class="mb-2">Select your favorite indie game:</p>
                                <div class="form-check form-check-inline" v-for="game in games" :key="game.value">
                                    <input class="form-check-input" type="radio" :id="game.value" :value="game.value"
                                        v-model="selectedImage" />
                                    <label class="form-check-label" :for="game.value">{{ game.label }}</label>
                                </div>
                            </div>

                            <!-- Image preview -->
                            <div class="mt-4 text-center">
                                <img v-if="selectedImage" :src="imageUrl" :alt="selectedImage"
                                    class="img-fluid rounded shadow" style="max-height: 300px;" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import stardewImg from '../assets/stardew.jpg'
import wildsImg from '../assets/wilds.jpg'
import hadesImg from '../assets/hades.jpg'

export default {
    name: 'About',
    data() {
        return {
            firstName: '',
            lastName: '',
            selectedImage: '',
            games: [
                { label: 'Stardew Valley', value: 'stardew' },
                { label: 'Outer Wilds', value: 'wilds' },
                { label: 'Hades', value: 'hades' }
            ]
        }
    },
    computed: {
        fullName() {
            return `${this.firstName} ${this.lastName}`.trim()
        },
        imageUrl() {
            return this.selectedImage === 'stardew'
                ? stardewImg
                : this.selectedImage === 'wilds'
                    ? wildsImg
                    : this.selectedImage === 'hades'
                        ? hadesImg
                        : ''
        }
    }
}
</script>

<style scoped>
.about {
    color: #f2f2f2;
    padding-bottom: 4rem;
}

/* Hero Section Style */
.hero-section {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(4px);
    border-radius: 12px;
    color: #f2f2f2;
}

.hero-title {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}

.hero-subtext {
    color: #cccccc;
    font-size: 1.1rem;
}

/* Glassy card */
.glass-card {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #e2e2e2;
}

/* Inputs */
.custom-input {
    background-color: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #f2f2f2;
}

.custom-input::placeholder {
    color: #aaa;
}

.form-label {
    color: #ddd;
}

.form-check-label {
    color: #ccc;
}

/* Image preview */
img {
    object-fit: cover;
    margin-bottom: 1rem;
}
</style>