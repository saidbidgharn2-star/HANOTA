let products = [];

function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const barcode = document.getElementById('productBarcode').value;

    if (!name || !price || !barcode) {
        alert("الرجاء ملء جميع الحقول");
        return;
    }

    const product = { name, price, barcode };
    products.push(product);

    // عرض المنتج في الجدول
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";
    products.forEach(p => {
        tbody.innerHTML += `<tr>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.barcode}</td>
        </tr>`;
    });

    // توليد الباركود للمنتج الأخير
    JsBarcode("#barcode", barcode, { format: "EAN13" });

    // مسح الحقول
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productBarcode').value = '';
}

// مسح الباركود باستخدام كاميرا الهاتف
Quagga.init({
    inputStream: {
        type : "LiveStream",
        target: document.querySelector('#scanner')
    },
    decoder: {
        readers: ["ean_reader"] // Barcode EAN
    }
}, function(err) {
    if (err) console.log(err);
    else Quagga.start();
});

Quagga.onDetected(function(data) {
    const code = data.codeResult.code;
    const product = products.find(p => p.barcode === code);
    if(product) {
        document.getElementById('scanResult').innerText = `المنتج: ${product.name} | السعر: ${product.price} درهم`;
    } else {
        document.getElementById('scanResult').innerText = `المنتج غير موجود`;
    }
});
