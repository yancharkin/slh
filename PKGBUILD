# Maintainer: Ivan Yancharkin <yancharkin@gmail.com>

pkgname=slh
pkgver=0.9.9
_pkgver=$(curl -s https://api.github.com/repos/yancharkin/slh/releases/latest | grep tag_name | cut -d '"' -f 4)
pkgrel=1
pkgdesc="A simple app that may or may not help you compose music."
arch=('x86_64')
license=('MIT')
depends=('electron')
makedepends=('curl')
_source=$(curl -s https://api.github.com/repos/yancharkin/slh/releases/latest | grep browser_download_url | grep electron| cut -d '"' -f 4)
source=(
    "${pkgname}_${_pkgver}.tar.gz::${_source}"
)
sha256sums=('SKIP')

pkgver() {
    echo "${_pkgver}"
}

package() {
    mkdir -p "${pkgdir}/opt/${pkgname}/"
    rm "${srcdir}/${pkgname}_${_pkgver}.tar.gz"
    cp -r "${srcdir}/"* "${pkgdir}/opt/${pkgname}/"
    install -dm755 "${pkgdir}/usr/bin"
    echo -e "#!/bin/bash\nelectron /opt/${pkgname}/" > "${pkgdir}/usr/bin/${pkgname}"
    chmod 755 "${pkgdir}/usr/bin/${pkgname}"

    install -dm755 "${pkgdir}/usr/share/applications/"
    {
        echo -e "[Desktop Entry]"
        echo -e "Version=1.0"
        echo -e "Type=Application"
        echo -e "Name=Songwriter's Little Helper"
        echo -e "Comment=A simple app that may or may not help you compose music."
        echo -e "TryExec=${pkgname}"
        echo -e "Exec=${pkgname}"
        echo -e "Icon=/opt/${pkgname}/assets/images/icon-192.png"
        echo -e "Categories=Audio;"
    } > "${pkgdir}/usr/share/applications/${pkgname}.desktop"
    chmod 644 "${pkgdir}/usr/share/applications/${pkgname}.desktop"
}

