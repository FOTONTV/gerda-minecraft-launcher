<template>
  <v-navigation-drawer
    :value="true"
    permanent
    width="200"
    :mini-variant="true"
    :color="sideBarColor"
    class="sidebar z-10 moveable"
    :style="{ 'backdrop-filter': `blur(${blurSidebar}px)` }"
  >
    <v-list
      nav
      dense
      class="px-2 ml-1"
    >
      <v-list-group
        v-model="expanding"
        active-class="v-list-item--link"
        class="non-moveable avatar"
      >
        <template #activator>
          <v-tooltip
            color="black"
            transition="scroll-x-transition"
            :close-delay="0"
            right
          >
            <template #activator="{ on: tooltip }">
              <v-list-item-avatar
                size="48"
                class="hover:rounded-xl transition-all duration-300"
                large
                @click="navToMe"
                v-on="tooltip"
              >
                <PlayerAvatar
                  :src="gameProfile.textures.SKIN.url"
                  :dimension="48"
                />
              </v-list-item-avatar>
            </template>
            {{ t('myStuff') }}
          </v-tooltip>
        </template>

        <v-tooltip
          :close-delay="0"
          color="black"
          transition="scroll-x-transition"
          right
        >
          <template #activator="{ on: tooltip }">
            <v-list-item
              link
              push
              to="/user"
              class="non-moveable"
              v-on="tooltip"
            >
              <v-list-item-icon>
                <v-icon>
                  manage_accounts
                </v-icon>
              </v-list-item-icon>

              <v-list-item-title v-text="'Text'" />
            </v-list-item>
          </template>
          {{ t('user.info') }}
        </v-tooltip>
        <v-tooltip
          color="black"
          transition="scroll-x-transition"
          :close-delay="0"
          right
        >
          <template #activator="{ on: tooltip }">
            <v-list-item
              link
              push
              to="/version-setting"
              class="non-moveable"
              v-on="tooltip"
            >
              <v-list-item-icon>
                <v-icon> power </v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="'Text'" />
            </v-list-item>
          </template>
          {{ t('localVersion.title') }}
        </v-tooltip>

        <v-tooltip
          color="black"
          transition="scroll-x-transition"
          :close-delay="0"
          right
        >
          <template #activator="{ on: tooltip }">
            <v-list-item
              link
              push
              to="/modpack-setting"
              class="non-moveable"
              v-on="tooltip"
            >
              <v-list-item-icon>
                <v-icon> inventory </v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="'Text'" />
            </v-list-item>
          </template>
          {{ t('modpack.name', 2) }}
        </v-tooltip>
        <v-divider />
      </v-list-group>
    </v-list>

    <AppSideBarContentFocus v-if="useFocus" />
    <AppSideBarContentNext v-else />

    <v-list
      nav
      dense
      class="px-2 ml-1"
      style=""
    >
      <v-tooltip
        :close-delay="0"
        right
        color="black"
        transition="scroll-x-transition"
      >
        <template #activator="{ on: tooltip }">
          <v-list-item
            push
            link
            class="non-moveable"
            to="/multiplayer"
            v-on="tooltip"
          >
            <v-list-item-icon>
              <v-icon>
                hub
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>Multiplayer</v-list-item-title>
          </v-list-item>
        </template>
        {{ t('multiplayer.name') }}
      </v-tooltip>

      <v-divider
        class="mx-1 block"
      />
      <v-tooltip
        :close-delay="0"
        right
        color="black"
        transition="scroll-x-transition"
      >
        <template #activator="{ on: tooltip }">
          <v-list-item
            link
            push
            to="/setting"
            class="non-moveable"
            v-on="tooltip"
          >
            <v-list-item-icon>
              <v-badge
                right
                overlap
                :value="state.updateStatus !== 'none'"
              >
                <template #badge>
                  <span>{{ 1 }}</span>
                </template>
                <v-icon>
                  settings
                </v-icon>
              </v-badge>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
        </template>
        {{ t('setting.name', 2) }}
      </v-tooltip>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang=ts setup>
import { useService } from '@/composables'
import { injection } from '@/util/inject'
import { BaseServiceKey } from '@gmcl/runtime-api'
import PlayerAvatar from '../components/PlayerAvatar.vue'
import { useBarBlur } from '../composables/background'
import { kColorTheme } from '../composables/colorTheme'
import { kUILayout } from '../composables/uiLayout'
import { useCurrentUser } from '../composables/user'
import AppSideBarContentFocus from './AppSideBarContentFocus.vue'
import AppSideBarContentNext from './AppSideBarContentNext.vue'
const { state } = useService(BaseServiceKey)
const { gameProfile } = useCurrentUser()
const { blurSidebar } = useBarBlur()
const layout = injection(kUILayout)
const useFocus = computed(() => layout.value === 'focus')
const { t } = useI18n()
const { sideBarColor } = injection(kColorTheme)
const { push, currentRoute } = useRouter()
const expanding = ref(false)
const navToMe = () => {
  if (currentRoute.path !== 'me') {
    push('/me')
  }
}
</script>

<style scoped>
.sidebar {
  min-width: 80px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
<style>
.v-navigation-drawer__content {
  @apply flex flex-col flex-grow-0 h-full;
}
.sidebar .v-list .v-list-item--active, .v-list .v-list-item--active .v-icon {
  /* color: #4caf50 !important; */
  color: var(--primary);
}
.sidebar .v-list-item--link:before {
  @apply text-white;
}
.sidebar .theme--dark.v-list-item--active:hover:before {
  opacity: .5;
}
.sidebar .theme--light.v-list-item--active:before {
  opacity: .25;
  background-color: gray;
}
.avatar .v-list-group__header.v-list-item--active:not(:hover):not(:focus):before {
  opacity: .24;
}
</style>
