class Receipt {
    constructor(items) {
        this.items = items;
    }

    calculateTotal() {
        let total = 0;
        for (let item of this.items) {
            total += item.price * item.number;
        }
        return total;
    }
}

class Item {
    constructor(name, price, number) {
        this.name = name;
        this.price = price;
        this.number = number;
    }
}

class Store {
    constructor() {
        this.inventory = [
            new Item('Buku', 50000, 10),
            new Item('Pensil', 5000, 20),
            new Item('Penghapus', 2000, 30),
            new Item('Pulpen', 1000, 40),
            new Item('Tipe-X', 6000, 50),
            new Item('Stapler', 15000, 60),
            new Item('Item', 1000, 70),
        ];
    }

    purchase(itemName, uangPembeli, jumlah) {
        for (let item of this.inventory) {
            if (item.name === itemName && item.price * jumlah <= uangPembeli) {
                return new Receipt([new Item(itemName, item.price, jumlah)]);
            }
        }
        return null;
    }

    returnItem(receipt, itemName, status, uangPembeli) {
        switch (itemName) {
            case 'Buku':
            case 'Pensil':
            case 'Penghapus':
            case 'Pulpen':
            case 'Tipe-X':
            case 'Stapler':
            case 'Item':
                if (receipt.items[0].price * receipt.items[0].number <= uangPembeli) {
                    this.inventory.push(new Item(itemName, receipt.items[0].price, status));
                    return uangPembeli - receipt.items[0].price * receipt.items[0].number;
                }
                return false;
            default:
                return false;
        }
    }
}

class Kwitansi extends Store {
    constructor() {
        super();
    }

    purchase(namaPembeli, itemName, uangPembeli, jumlah) {
        let receipt = super.purchase(itemName, uangPembeli, jumlah);
        let status = receipt !== null;
        console.log(`ATAS NAMA PEMBELI : ${namaPembeli}`);
        console.log(`JUMLAH UANG ANDA : Rp ${uangPembeli},-`)
        console.log('\nSTATUS PEMBELIAN');
        console.log('==================================================================================================');
        console.log(`Nama Barang : ${itemName}`);
        console.log(`Jumlah yang dibeli : ${jumlah}`)
        console.log(`Metode Pembayaran : Tunai`)
        console.log(`Pembelian ${status ? 'berhasil' : 'gagal'}! ${status ? 'Anda telah berhasil membeli ' + jumlah + ' ' + itemName + ' dengan total harga sebesar : Rp ' + receipt.calculateTotal() : 'Maaf, Barang yang anda masukkan tidak tersedia atau uang anda tidak cukup.'}`);
        console.log('==================================================================================================');
        return receipt;
    }
}

let store = new Kwitansi();
let uangPembeli = 300000;
let receipt = store.purchase('Mardi', 'Buku', uangPembeli, 6);

if (receipt !== null) {
    let returnSuccess = store.returnItem(receipt, 'Item', true, uangPembeli);
    if (typeof returnSuccess === 'number') {
        console.log('\n\nPENGEMBALIAN UANG DARI SI PEMBELI');
        console.log('=======================================================================');
        console.log(`Pengembalian berhasil!`);
        console.log(`Uang kembalian : Rp ${returnSuccess},-`);
        console.log(`TERIMA KASIH SUDAH BERBELANJA ^^`);
        console.log('=======================================================================');
    } else {
        console.log(`Pengembalian Gagal!`)
    }
}
