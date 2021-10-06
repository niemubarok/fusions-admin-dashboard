<template>
  <main-section class="flex justify-center pt-20">
    <modal-box v-model="isModalActive" button-label="Yes" has-cancel>
      <feather-icon
        path="alert-triangle"
        w="50"
        h="50"
        size="50px"
        class="flex justify-center w-full text-red-400"
      />
      <div class="w-full bg-red-600 bg-opacity-20 h-10 pt-2 rounded-md ">
        <span
          class="flex justify-center w-full text-gray-900 text-center font-lg"
        >
          Make sure you remember your new password! <br />
        </span>
      </div>
      <div class="pt-5 flex justify-center">
        Are you sure to continue?
      </div>
    </modal-box>
    <card-component
      class="w-11/12 md:w-5/12 bg-transparent rounded-lg"
      @submit.prevent="submit"
      form
    >
      <div class="flex justify-center w-full mb-4">
        <logo />
      </div>
      <div class="flex justify-center w-full text-gray-500 text-center font-lg">
        You are about to change your password
      </div>
      <div
        style="font-size:10pt;margin-top:-2px;margin-bottom:15px"
        class="flex justify-center w-full text-gray-500 font-xs "
      >
        <small>
          Please enter your new password
        </small>
      </div>
      <div>
        <floating-label-input
          label="New Password"
          :type="repeatPassType"
          icon="lock"
          v-model="form.login"
        />
      </div>

      <div class="mt-4">
        <floating-label-input
          :type="repeatPassType"
          label="Repeat New Password"
          icon="lock"
          v-model="form.pass"
        >
          <template #append>
            <!-- <feather-icon
              v-if="repeatPassType !== 'password'"
              path="eye"
              @click="togglePasswordVisibility"
            />
            <feather-icon
              v-if="repeatPassType == 'password'"
              path="eye-off"
              @click="togglePasswordVisibility"
            /> -->
          </template>
        </floating-label-input>
      </div>

      <div class="mt-3 float-right text-gray-500">
        <check-radio-picker
          name="showPassword"
          v-model="form.remember"
          :options="{ show: 'Show Password' }"
          @change="togglePasswordVisibility"
        />
      </div>

      <divider class="mt-20" />
      <jb-buttons>
        <jb-button type="submit" color="info" label="Save new password" />
      </jb-buttons>

      <div
        @click="$router.go(-1)"
        class="float-right  pb-4 cursor-pointer text-blue-400"
      >
        <span class="inline-block align-middle">
          <feather-icon path="chevron-left"> </feather-icon>
        </span>
        <span class="-ml-2">
          back
        </span>
      </div>
    </card-component>
  </main-section>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import MainSection from "@/components/MainSection";
import CardComponent from "@/components/CardComponent";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import Divider from "@/components/Divider.vue";
import JbButton from "@/components/JbButton";
import JbButtons from "@/components/JbButtons";
import ModalBox from "@/components/ModalBox";
import FloatingLabelInput from "../components/FloatingLabelInput.vue";
import Logo from "../components/Logo.vue";
import FeatherIcon from "../components/FeatherIcon.vue";

export default {
  name: "Login",
  components: {
    MainSection,
    CardComponent,
    Divider,
    JbButton,
    JbButtons,
    ModalBox,
    CheckRadioPicker,
    FloatingLabelInput,
    Logo,
    FeatherIcon
  },
  setup() {
    const form = reactive({
      login: "",
      pass: "",
      remember: false
    });
    const isModalActive = ref(false);

    const repeatPassType = ref("password");

    const togglePasswordVisibility = () => {
      repeatPassType.value =
        repeatPassType.value == "password" ? "text" : "password";
    };

    const router = useRouter();

    const submit = () => {
      isModalActive.value = true;
    };

    return {
      isModalActive,
      form,
      submit,
      mdiAccount,
      mdiAsterisk,
      repeatPassType,
      togglePasswordVisibility
    };
  }
};
</script>
