const initMenu = (): void => {
    const menuToggle = document.querySelector<HTMLInputElement>("nav input[type=checkbox]");
    const lastMenuItem = document.querySelector<HTMLElement>("nav ul li:last-of-type a");
    const startOfMenuItem = document.querySelector("#start-of-menu");
    const endOfMenuItem = document.querySelector("#end-of-menu");

    // Handles all changes to state when the menu is shown/hidden
    const onCheckChange = (): void => {
        const isChecked = menuToggle.checked;
        document.body.classList.toggle("disable-scrolling", isChecked);
        menuToggle.setAttribute("title", isChecked ? "Close Menu" : "Open Menu");

        const tabIndex = String(isChecked ? 0 : -1);
        endOfMenuItem.setAttribute("tabindex", tabIndex);
        startOfMenuItem.setAttribute("tabindex", tabIndex);
    };
    onCheckChange();
    menuToggle.addEventListener("change", onCheckChange);

    // Wrap around to the last menu item when tabbing backwards
    startOfMenuItem.addEventListener("focusin", (): void => {
        if (menuToggle.checked) {
            lastMenuItem.focus();
        }
    });
    // Wrap around to the top of the menu when tabbing forwards
    endOfMenuItem.addEventListener("focusin", (): void => {
        if (menuToggle.checked) {
            menuToggle.focus();
        }
    });
};

const resetNavMenu = (): void => {
    const menuCheckbox = document.querySelector<HTMLInputElement>(
        "nav input[type=checkbox]:checked"
    );
    if (menuCheckbox) {
        menuCheckbox.checked = false;

        // Just setting checked won't trigger the callback so fire
        // the change event.
        const event = document.createEvent("HTMLEvents");
        event.initEvent("change");
        menuCheckbox.dispatchEvent(event);
    }
};

export { resetNavMenu, initMenu };
