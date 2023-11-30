<template>
    <TransitionRoot as="template" :show="open">
        <Dialog
            as="div"
            class="fixed inset-0 overflow-y-auto"
            style="z-index: 1001"
        >
            <div
                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay
                        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    />
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span
                    class="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                    >&#8203;</span
                >
                <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        :class="maxWidthClass" class="relative inline-block align-middle bg-white rounded-xl px-4 pt-4 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:p-6 bg-slate-900"
                    >
                        <button class="z-10 absolute top-5 right-5 rounded-full p-0 text-white" @click.prevent="cancelButton"><i class="fas fa-xmark text-xl"></i></button>
                        <div>
                            <!-- This is where content is inserted -->
                            <slot></slot>
                        </div>
                        <div
                            class="mt-5 sm:mt-6 gap-1 grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
                            v-if="showBottomButtons"
                        >
                            <button
                                :disabled="loading"
                                type="button"
                                :class="[
                                    type == 'danger'
                                        ? 'w-full inline-flex justify-center sm:col-start-2 btn-danger'
                                        : 'w-full inline-flex justify-center sm:col-start-2 ' + confirmColorClass,
                                ]"
                                @click.prevent="confirmButton"
                            >
                                <span>
                                    <i
                                        v-if="!loading"
                                        :class="confirmIcon"
                                    ></i>
                                    <i
                                        v-else-if="loading"
                                        class="fa fa-fw fa-spin fa-spinner"
                                    ></i>
                                    {{ confirmText }}
                                </span>
                            </button>
                            <button
                                :disabled="loading"
                                type="button"
                                class="w-full inline-flex justify-center sm:col-start-1 btn-standard"
                                @click.prevent="cancelButton"
                            >
                                {{ cancelText ?? "Cancel" }}
                            </button>
                        </div>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
export default {
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
    },
    props: {
        open: Boolean,
        icon: String,
        confirmIcon: String,
        confirmText: String,
        title: String,
        description: String,
        cancelText: String,
        type: String,
        loading: Boolean,
        modelValue: String,
        maxWidthClass: {
            default: 'sm:max-w-xl',
            type: String
        },
        confirmColorClass: {
            default: 'btn-primary',
            type: String
        },
        showBottomButtons: {
            default: false,
            type: Boolean
        }
    },
    methods: {
        cancelButton() {
            this.$emit("cancelButton");
        },
        confirmButton() {
            this.$emit("confirmButton");
        },
    },
    watch: {
        // Watch the modelvalue change and emit the update to parent
        modelValue(newValue) {
            this.$emit("update:modelValue", newValue);
        },
    },
};
</script>
