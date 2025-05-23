<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
	<div id="registration_settings_form">
		<NcSettingsSection :name="t('registration', 'Registration settings')">
			<NcCheckboxRadioSwitch :checked.sync="adminApproval"
				type="switch"
				:disabled="loading"
				@update:checked="saveData">
				{{ t('registration', 'Require administrator approval') }}
			</NcCheckboxRadioSwitch>

			<p><em>{{ t('registration', 'Enabling "administrator approval" will prevent registrations from mobile and desktop clients to complete as the credentials cannot be verified by the client until the user was enabled.') }}</em></p>

			<div>
				<div class="margin-top">
					<label for="registered_user_group">
						{{ t('registration', 'Registered users default group') }}
					</label>
				</div>
				<NcSelect id="registered_user_group"
					v-model="registeredUserGroup"
					:placeholder="t('registration', 'Select group')"
					:options="groups"
					:disabled="loading"
					:searchable="true"
					:tag-width="60"
					:loading="loadingGroups"
					:close-on-select="false"
					label="displayname"
					@search="searchGroup"
					@input="saveData" />
			</div>
		</NcSettingsSection>

		<NcSettingsSection :name="t('registration', 'Email settings')">
			<NcCheckboxRadioSwitch :checked.sync="emailIsOptional"
				type="switch"
				:disabled="loading"
				@update:checked="saveData">
				{{ t('registration', 'Email is optional') }}
			</NcCheckboxRadioSwitch>

			<NcTextField :label="domainListLabel"
				:label-visible="true"
				:value.sync="allowedDomains"
				:disabled="loading"
				placeholder="nextcloud.com;*.example.com"
				@input="debounceSavingSlow" />

			<NcCheckboxRadioSwitch :checked.sync="domainsIsBlocklist"
				type="switch"
				:disabled="loading"
				@update:checked="saveData">
				{{ t('registration', 'Block listed email domains instead of allowing them') }}
			</NcCheckboxRadioSwitch>

			<NcCheckboxRadioSwitch :checked.sync="showDomains"
				type="switch"
				:disabled="loading"
				@update:checked="saveData">
				{{ showDomainListLabel }}
			</NcCheckboxRadioSwitch>

			<NcCheckboxRadioSwitch v-if="!emailIsOptional"
				:checked.sync="disableEmailVerification"
				type="switch"
				:disabled="loading"
				@update:checked="saveData">
				{{ t('registration', 'Disable email verification') }}
			</NcCheckboxRadioSwitch>
		</NcSettingsSection>

		<NcSettingsSection :name="t('registration', 'User settings')">
			<NcCheckboxRadioSwitch v-if="!emailIsOptional"
				:checked.sync="emailIsLogin"
				type="switch"
				:disabled="loading"
				@update:checked="saveData">
				{{ t('registration', 'Force email as login name') }}
			</NcCheckboxRadioSwitch>
			<template v-if="!emailIsLogin">
				<p>
					<label for="username_policy_regex">{{ t('registration', 'Login name policy') }}</label>
					<input id="username_policy_regex"
						v-model="usernamePolicyRegex"
						type="text"
						name="username_policy_regex"
						:disabled="loading"
						placeholder="E.g.: /^[a-z-]+\.[a-z-]+$/"
						:aria-label="t('registration', 'Regular expression to validate login names')"
						@input="debounceSavingSlow">
				</p>
				<em>{{ t('registration', 'If configured, login names will be validated through the regular expression. If the validation fails the user is prompted with a generic error. Make sure your regex is working correctly.') }}</em>
			</template>

			<NcCheckboxRadioSwitch :checked.sync="showFullname"
				:disabled="loading"
				type="switch"
				@update:checked="saveData">
				{{ t('registration', 'Show full name field') }}
			</NcCheckboxRadioSwitch>

			<NcCheckboxRadioSwitch v-if="showFullname"
				class="indent"
				:checked.sync="enforceFullname"
				type="switch"
				:disabled="loading"
				@update:checked="saveData">
				{{ t('registration', 'Enforce full name field') }}
			</NcCheckboxRadioSwitch>

			<NcCheckboxRadioSwitch :checked.sync="showPhone"
				type="switch"
				:disabled="loading"
				@update:checked="saveData">
				{{ t('registration', 'Show phone field') }}
			</NcCheckboxRadioSwitch>

			<NcCheckboxRadioSwitch v-if="showPhone"
				class="indent"
				:checked.sync="enforcePhone"
				type="switch"
				:disabled="loading"
				@update:checked="saveData">
				{{ t('registration', 'Enforce phone field') }}
			</NcCheckboxRadioSwitch>
		</NcSettingsSection>

		<NcSettingsSection :name="t('registration', 'User instructions')"
			:description="t('registration', 'Caution: The user instructions will not be translated and will therefore be displayed as configured below for all users regardless of their actual language.')">
			<h3>{{ t('registration', 'Registration form instructions') }}</h3>
			<input v-model="additionalHint"
				type="text"
				name="additional_hint"
				:disabled="loading"
				:placeholder="t('registration', `Please create your username following the scheme 'firstname.lastname'.`)"
				:aria-label="t('registration', 'A short message that is shown to the user in the registration process.')"
				@input="debounceSavingSlow">
			<p><em>{{ t('registration', 'Add additional user instructions (e.g. for choosing their login name). If configured the text is displayed in the account creation step of the registration process.') }}</em></p>

			<h3>{{ t('registration', 'Verification email instructions') }}</h3>
			<input v-model="emailVerificationHint"
				type="text"
				name="email_verification_hint"
				:disabled="loading"
				:placeholder="t('registration', `Please create your username following the scheme 'firstname.lastname'.`)"
				:aria-label="t('registration', 'A short message that is shown to the user in the verification email.')"
				@input="debounceSavingSlow">
			<p><em>{{ t('registration', 'Add additional user instructions (e.g. for choosing their login name). If configured the text is embedded in the verification-email.') }}</em></p>
		</NcSettingsSection>
	</div>
</template>

<script>
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import NcSettingsSection from '@nextcloud/vue/dist/Components/NcSettingsSection.js'
import NcCheckboxRadioSwitch from '@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js'
import NcTextField from '@nextcloud/vue/dist/Components/NcTextField.js'
import axios from '@nextcloud/axios'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { loadState } from '@nextcloud/initial-state'
import { generateOcsUrl, generateUrl } from '@nextcloud/router'
import debounce from 'debounce'

// Styles
import '@nextcloud/dialogs/style.css'

export default {
	name: 'AdminSettings',

	components: {
		NcSelect,
		NcSettingsSection,
		NcCheckboxRadioSwitch,
		NcTextField,
	},

	data() {
		return {
			loading: false,
			loadingGroups: false,
			groups: [],
			saveNotification: null,

			adminApproval: false,
			registeredUserGroup: '',
			allowedDomains: '',
			domainsIsBlocklist: false,
			showDomains: false,
			emailIsOptional: false,
			disableEmailVerification: false,
			emailIsLogin: false,
			usernamePolicyRegex: '',
			showFullname: false,
			enforceFullname: false,
			showPhone: false,
			enforcePhone: false,
			additionalHint: '',
			emailVerificationHint: '',
		}
	},

	computed: {
		domainListLabel() {
			if (this.domainsIsBlocklist) {
				return t('registration', 'Blocked email domains')
			}

			return t('registration', 'Allowed email domains')
		},
		showDomainListLabel() {
			if (this.domainsIsBlocklist) {
				return t('registration', 'Show the blocked email domains to users')
			}

			return t('registration', 'Show the allowed email domains to users')
		},
	},

	mounted() {
		this.adminApproval = loadState('registration', 'admin_approval_required')
		this.registeredUserGroup = loadState('registration', 'registered_user_group')
		this.allowedDomains = loadState('registration', 'allowed_domains')
		this.domainsIsBlocklist = loadState('registration', 'domains_is_blocklist')
		this.showDomains = loadState('registration', 'show_domains')
		this.emailIsOptional = loadState('registration', 'email_is_optional')
		this.disableEmailVerification = loadState('registration', 'disable_email_verification')
		this.emailIsLogin = loadState('registration', 'email_is_login')
		this.usernamePolicyRegex = loadState('registration', 'username_policy_regex')
		this.showFullname = loadState('registration', 'show_fullname')
		this.enforceFullname = loadState('registration', 'enforce_fullname')
		this.showPhone = loadState('registration', 'show_phone')
		this.enforcePhone = loadState('registration', 'enforce_phone')
		this.additionalHint = loadState('registration', 'additional_hint')
		this.emailVerificationHint = loadState('registration', 'email_verification_hint')

		this.searchGroup('')
	},
	methods: {
		debounceSavingSlow: debounce(function() {
			this.saveData()
		}, 2000),

		async saveData() {
			this.loading = true
			if (this.saveNotification) {
				await this.saveNotification.hideToast()
			}

			try {
				const response = await axios.post(generateUrl('/apps/registration/settings'), {
					admin_approval_required: this.adminApproval,
					registered_user_group: this.registeredUserGroup?.id,
					allowed_domains: this.allowedDomains,
					domains_is_blocklist: this.domainsIsBlocklist,
					show_domains: this.showDomains,
					email_is_optional: this.emailIsOptional,
					disable_email_verification: this.emailIsOptional || this.disableEmailVerification,
					email_is_login: !this.emailIsOptional && this.emailIsLogin,
					username_policy_regex: this.usernamePolicyRegex,
					show_fullname: this.showFullname,
					enforce_fullname: this.enforceFullname,
					show_phone: this.showPhone,
					enforce_phone: this.enforcePhone,
					additional_hint: this.additionalHint,
					email_verification_hint: this.emailVerificationHint,
				})

				if (response?.data?.status === 'success' && response?.data?.data?.message) {
					this.saveNotification = showSuccess(response.data.data.message)
				} else if (response?.data?.data?.message) {
					this.saveNotification = showError(response.data.data.message)
				} else {
					this.saveNotification = showError(t('registration', 'An error occurred while saving the settings'))
				}
			} catch (e) {
				if (e.response?.data?.data?.message) {
					this.saveNotification = showError(e.response.data.data.message)
				} else {
					this.saveNotification = showError(t('registration', 'An error occurred while saving the settings'))
					console.error(e)
				}
			}

			this.loading = false
		},

		searchGroup: debounce(async function(query) {
			this.loadingGroups = true
			try {
				const response = await axios.get(generateOcsUrl('cloud/groups/details'), {
					search: query,
					limit: 20,
					offset: 0,
				})
				this.groups = response.data.ocs.data.groups.sort(function(a, b) {
					return a.displayname.localeCompare(b.displayname)
				})
			} catch (err) {
				console.error('Could not fetch groups', err)
			} finally {
				this.loadingGroups = false
			}
		}, 500),
	},
}
</script>

<style scoped lang="scss">

p {
	label {
		display: block;
	}

	margin-top: 15px;
}

.indent {
	padding-left: 28px;
}

.margin-top {
	margin-top: 1rem;
}

input,
select {
	width: 33%;
	min-width: 250px;
}

h3 {
	margin-top: 25px;
}
</style>
