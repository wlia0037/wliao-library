<template>
  <div class="container py-4">
    <h1 class="display-5 mb-4 text-center">User Information Form</h1>

    <!-- Form -->
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <form @submit.prevent="onSubmit" @reset="onReset" novalidate>
          <!-- Username -->
          <div class="mb-3">
            <label class="form-label" for="username">Username</label>
            <input
              id="username"
              type="text"
              class="form-control"
              v-model.trim="form.username"
              :class="{ 'is-invalid': submitted && errors.username }"
              placeholder="Enter your username"
            />
            <div class="invalid-feedback" v-if="submitted && errors.username">
              {{ errors.username }}
            </div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label class="form-label" for="password">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              v-model="form.password"
              :class="{ 'is-invalid': submitted && errors.password }"
              placeholder="At least 8 characters"
            />
            <div class="invalid-feedback" v-if="submitted && errors.password">
              {{ errors.password }}
            </div>
          </div>

          <!-- Resident -->
          <div class="form-check mb-3">
            <input
              id="resident"
              type="checkbox"
              class="form-check-input"
              v-model="form.isResident"
            />
            <label class="form-check-label" for="resident">
              Australian Resident?
            </label>
          </div>

          <!-- Reason -->
          <div class="mb-3">
            <label class="form-label" for="reason">Reason For Joining</label>
            <textarea
              id="reason"
              class="form-control"
              rows="3"
              v-model.trim="form.reason"
              :class="{ 'is-invalid': submitted && errors.reason }"
              placeholder="Tell us a short reason (min 10 chars)"
            ></textarea>
            <div class="invalid-feedback" v-if="submitted && errors.reason">
              {{ errors.reason }}
            </div>
          </div>

          <!-- Gender -->
          <div class="mb-4">
            <label class="form-label" for="gender">Gender</label>
            <select
              id="gender"
              class="form-select"
              v-model="form.gender"
              :class="{ 'is-invalid': submitted && errors.gender }"
            >
              <option disabled value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div class="invalid-feedback" v-if="submitted && errors.gender">
              {{ errors.gender }}
            </div>
          </div>

          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="reset" class="btn btn-secondary">Clear</button>
          </div>
        </form>
      </div>
    </div>

    <!-- DataTable -->
    <div v-if="users.length" class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title mb-3">Submitted Users</h5>
        <DataTable :value="users" dataKey="id" tableStyle="min-width: 50rem">
          <Column field="username" header="Username" />
          <Column header="Gender">
            <template #body="slotProps">
              {{ formatGender(slotProps.data.gender) }}
            </template>
          </Column>
          <Column header="Resident">
            <template #body="slotProps">
              {{ slotProps.data.isResident ? 'Yes' : 'No' }}
            </template>
          </Column>
          <Column field="reason" header="Reason" />
          <Column header="Password">
            <template #body="slotProps">
              {{ maskPassword(slotProps.data.password) }}
            </template>
          </Column>
          <Column header="Actions" style="width: 8rem">
            <template #body="slotProps">
              <button
                class="btn btn-sm btn-outline-danger"
                @click="removeRow(slotProps.data)"
              >
                Delete
              </button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  username: '',
  password: '',
  isResident: false,
  reason: '',
  gender: ''
})

const users = ref([])
const submitted = ref(false)
const errors = reactive({})

function validate () {
  Object.keys(errors).forEach(k => delete errors[k])

  if (!form.username) {
    errors.username = 'Username is required'
  } else if (form.username.length < 3 || form.username.length > 20) {
    errors.username = 'Username must be 3-20 characters'
  }

  if (!form.password) {
    errors.password = 'Password is required'
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  }

  if (!form.reason) {
    errors.reason = 'Reason is required'
  } else if (form.reason.length < 10) {
    errors.reason = 'Reason must be at least 10 characters'
  }

  if (!form.gender) {
    errors.gender = 'Please select a gender'
  }

  return Object.keys(errors).length === 0
}

function onSubmit () {
  submitted.value = true
  if (!validate()) return

  users.value.push({
    id: cryptoRandomId(),
    username: form.username,
    password: form.password,
    isResident: form.isResident,
    reason: form.reason,
    gender: form.gender
  })

  onReset()
  submitted.value = false
}

function onReset () {
  form.username = ''
  form.password = ''
  form.isResident = false
  form.reason = ''
  form.gender = ''
}

function removeRow (row) {
  users.value = users.value.filter(u => u.id !== row.id)
}

function formatGender (g) {
  return g ? g.charAt(0).toUpperCase() + g.slice(1) : ''
}

function maskPassword (pwd) {
  return '•'.repeat(Math.min(pwd?.length || 0, 12))
}

function cryptoRandomId () {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint32Array(2)
    crypto.getRandomValues(arr)
    return `${arr[0].toString(16)}${arr[1].toString(16)}`
  }
  return Math.random().toString(36).slice(2)
}
</script>

<style scoped>
.card-title { font-weight: 600; }
</style>
