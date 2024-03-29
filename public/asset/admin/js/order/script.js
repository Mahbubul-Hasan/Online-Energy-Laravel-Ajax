$(function() {
    // All Order------------------------------------------------------------
    const allOrder = () => {
        let url = $("#allOrder").data("url");
        $.ajax({
            url: url,
            type: "GET",
            dataType: "HTML",
            success: data => {
                $("#showAllOrder").html(data);
            }
        });
    };

    // View------------------------------------------------------------
    $(document).on("click", "#view", function(event) {
        event.preventDefault();
        let url = $(this).attr("href");
        console.log("TCL: url", url);
        $.ajax({
            url: url,
            typr: "GET",
            dataType: "HTML",
            success: data => {
                $("#viewOrderModal").modal("show");
                $("#orderProducts").html(data);

                let oSubtotal = Number(
                    $("#oSubtotal")
                        .text()
                        .replace(/[^0-9.-]+/g, "")
                );

                let quantity = $("#tQuantity").text();
                let location = $(this).data("location");
                let dCharege = quantity * location;
                $("#odCharege").text(currencyFormat(dCharege));

                $("#odTotal").text(currencyFormat(oSubtotal + dCharege));
            }
        });
    });
    // Delete------------------------------------------------------------
    $(document).on("click", "#delete", function(event) {
        event.preventDefault();
        let url = $(this).attr("href");
        let token = $(this).data("token");

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.value) {
                $.ajax({
                    url: url,
                    type: "POST",
                    data: {
                        _method: "delete",
                        _token: token
                    },
                    dataType: "JSON",
                    success: function(data) {
                        if (data === "delete") return allOrder();
                    }
                });
                console.log("Delete");
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    });

    // Edit------------------------------------------------------------
    $(document).on("click", "#edit", function(event) {
        event.preventDefault();

        $(".errorOName").css("display", "none");
        $(".errorOPhone").css("display", "none");
        $(".errorOEmail").css("display", "none");
        $(".errorOAddress").css("display", "none");
        $(".errorOTotalPrice").css("display", "none");

        let url = $(this).attr("href") + "/edit";

        $.ajax({
            url: url,
            type: "GET",
            dataType: "JSON",
            success: data => {
                $("#editOrderModal").modal("show");

                $("#eOId").val(data.id);
                $("#eOUserId").val(data.user_id);
                $("#eOName").val(data.name);
                $("#eOPhone").val(data.phone);
                $("#eOEmail").val(data.email);
                $("#eOAddress").val(data.address);
                $("#eOTotalPrice").val(data.totalPrice);
                $("#eOTotalPrice").val(data.totalPrice);
                $("#location-" + data.location).prop("checked", true);
                $("#status-" + data.status).prop("checked", true);
            }
        });
    });

    // Update------------------------------------------------------------
    $(document).on("submit", "#updateOrderForm", function(event) {
        event.preventDefault();

        let id = $("#eOId").val();
        let url = $(this).attr("action") + "/" + id;
        let method = $(this).attr("method");
        let data = $(this).serialize();

        $.ajax({
            url: url,
            type: method,
            data: data,
            dataType: "JSON",
            success: data => {
                if (data.name) {
                    $(".errorOName").css("display", "block");
                    $(".errorOName").html(data.name);
                } else if (data.phone) {
                    $(".errorOPhone").css("display", "block");
                    $(".errorOPhone").html(data.phone);
                } else if (data.email) {
                    $(".errorOEmail").css("display", "block");
                    $(".errorOEmail").html(data.email);
                } else if (data.address) {
                    $(".errorOAddress").css("display", "block");
                    $(".errorOAddress").html(data.address);
                } else if (data.totalPrice) {
                    $(".errorOTotalPrice").css("display", "block");
                    $(".errorOTotalPrice").html(data.totalPrice);
                } else if ((data = "seccess")) {
                    Swal.fire({
                        position: "top-end",
                        type: "success",
                        title: "Order successfully updated",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $("#editOrderModal").modal("hide");
                    return allOrder();
                }
            }
        });
    });

    // pagination---------------------------------------------------------
    $(document).on("click", ".pagination li a", function(event) {
        event.preventDefault();

        let url = $(this).attr("href");
        let pageNumber = url.split("?page=")[1];

        let newUrl = $("#orderPagination").data("url") + "?page=" + pageNumber;
        console.log("TCL: newUrl", newUrl)

        $.ajax({
            url: newUrl,
            type: "GET",
            dataType: "HTML",
            success: data => {
                $("#showAllOrder").html(data);
            }
        });
    });

    // Search---------------------------------------------------------
    $(document).on("keyup", ".admin-search", function() {
        setTimeout(() => {
            let key = $(".admin-search").val();
            let url = $("#order-search").data("url") + "?key=" + key;
            console.log("TCL: url", url)

            $.ajax({
                url: url,
                type: "GET",
                dataType: "HTML",
                success: data => {
                    console.log(data);
                    $("#showAllOrder").html(data);
                }
            });
        }, 1000);
    });

    // Number to Currency--------------------------------------------------
    const currencyFormat = price => {
        return price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };
});
