<template>
    <div class="about">
        <!-- Page introduction styled like a hero section -->
        <section class="hero-section text-center py-5">
            <div class="container">
                <!-- Main heading -->
                <h2 class="display-5 fw-bold hero-title">About IndieVault</h2>
                <!-- Subheading/description -->
                <p class="lead hero-subtext">
                    IndieVault is your hub for discovering new indie games, reading the latest dev news,
                    and connecting with fellow creators and players around the world.
                </p>
            </div>
        </section>

        <!-- User interaction area: form, selection, image -->
        <section class="py-4">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <!-- A glassy card to visually group the form and radio buttons -->
                        <div class="glass-card p-4">
                            <!-- Form section: captures user's first and last name -->
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

                            <!-- Dynamic greeting that shows up only if a name is entered -->
                            <div class="alert alert-primary mt-4" v-if="fullName">
                                Welcome, {{ fullName }}!
                            </div>

                            <!-- Favorite indie game selection using radio buttons -->
                            <div class="mt-4">
                                <p class="mb-2">Select your favorite indie game:</p>
                                <div class="form-check form-check-inline" v-for="game in games" :key="game.value">
                                    <input class="form-check-input" type="radio" :id="game.value" :value="game.value"
                                        v-model="selectedImage" />
                                    <label class="form-check-label" :for="game.value">{{ game.label }}</label>
                                </div>
                            </div>

                            <!-- Preview image of the selected indie game -->
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
// Importing local image assets for the selected games
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
            // List of indie games the user can choose from
            games: [
                { label: 'Stardew Valley', value: 'stardew' },
                { label: 'Outer Wilds', value: 'wilds' },
                { label: 'Hades', value: 'hades' }
            ]
        }
    },
    computed: {
        // Computed full name based on first and last input
        fullName() {
            return `${this.firstName} ${this.lastName}`.trim()
        },
        // Returns the image URL based on which radio option is selected
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
/* Ensure text is visible on dark backgrounds */
.about {
    color: #f2f2f2;
    padding-bottom: 4rem;
}

/* Glassy background hero header */
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

/* Card for form section with glassy effect */
.glass-card {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #e2e2e2;
}

/* Input fields styled to match theme */
.custom-input {
    background-color: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #f2f2f2;
}

.custom-input::placeholder {
    color: #aaa;
}

/* Labels styled for readability on dark background */
.form-label {
    color: #ddd;
}

.form-check-label {
    color: #ccc;
}

/* Prevent image from stretching weirdly */
img {
    object-fit: cover;
    margin-bottom: 1rem;
}
</style>