<template>
    <div class="login-page container py-5">
        <!-- Hero header matching others -->
        <section class="hero-section text-center mb-4">
            <h2 class="display-6 fw-bold">Login to IndieVault</h2>
            <p class="hero-subtext">Enter your credentials to access your profile and wishlist.</p>
        </section>

        <!-- Glassy form card -->
        <form @submit.prevent="handleLogin" aria-label="Login form" class="glass-card p-4 mx-auto"
            style="max-width: 400px;"> <!-- Email field -->
            <div class="mb-3">
                <label for="email" class="form-label custom-label">Email</label>
                <input v-model="email" type="email" id="email" class="form-control custom-input" required
                    autocomplete="email" />
            </div>

            <!-- Password field -->
            <div class="mb-3">
                <label for="password" class="form-label custom-label">Password</label>
                <input v-model="password" type="password" id="password" class="form-control custom-input" required
                    autocomplete="current-password" />
            </div>

            <!-- Error message -->
            <div v-if="errorMessage" class="alert custom-alert" role="alert" aria-live="assertive">
                {{ errorMessage }}
            </div>

            <!-- Submit button -->
            <button type="submit" class="btn custom-btn w-100">Login</button>
        </form>
    </div>
</template>

<script>
import auth from '../store/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'Login',
    setup() {
        const email = ref('')
        const password = ref('')
        const errorMessage = ref('')
        const router = useRouter()

        const handleLogin = () => {
            errorMessage.value = ''
            const success = auth.login(email.value, password.value)
            if (!success) {
                errorMessage.value = 'Invalid email or password'
                return
            }
            router.push('/')
        }

        return {
            email,
            password,
            errorMessage,
            handleLogin
        }
    }
}
</script>

<style scoped>
.login-page {
    color: #f2f2f2;
}

/* Hero section styling */
.hero-section {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 12px;
    padding: 1rem;
    color: #f2f2f2;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}

.hero-subtext {
    color: #cccccc;
    font-size: 1rem;
}

/* Glassy form card */
.glass-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 16px;
    color: #e2e2e2;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Form labels */
.custom-label {
    color: #ddd;
    font-weight: 500;
}

/* Inputs */
.custom-input {
    background-color: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #f2f2f2;
    transition: border 0.3s ease, background 0.3s ease;
}

.custom-input::placeholder {
    color: #aaa;
}

.custom-input:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.08);
}

/* Alert */
.custom-alert {
    background-color: rgba(220, 53, 69, 0.2);
    border-color: rgba(220, 53, 69, 0.4);
    color: #fff;
    margin-bottom: 1rem;
}

/* Button */
.custom-btn {
    background-color: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #f2f2f2;
    font-weight: 600;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    transition: background 0.3s ease, transform 0.2s ease;
}

.custom-btn:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
}

/* Ensure input text is bright and legible */
.custom-input {
    color: #f2f2f2 !important;
    caret-color: #f2f2f2;
}

/* Also target the native form-control in case it’s overriding */
.login-page .form-control {
    color: #f2f2f2;
    caret-color: #f2f2f2;
}
</style>