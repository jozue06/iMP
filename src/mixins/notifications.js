function notification(title, message, variant, location, delay, append) {
    this.$bvToast.toast(message || "", {
        title: title || "",
        variant: variant || "success",
        toaster: location || "b-toaster-top-center",
        solid: true,
        autoHideDelay: delay || 2000,
        appendToast: append || true
    });
}

export { notification }