const get404 = (req, res, next) => {
    res.status(404).render("404", {
        layout: "layouts/main-layout",
        pageTitle: "Page Not Found",
        path: "error",
    });
};

module.exports = { get404 };
