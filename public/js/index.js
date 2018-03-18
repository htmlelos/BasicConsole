function openNav() {
  const sidemenu = document.getElementById('side-menu')
  sidemenu.style.width = '250px'
  const overlay = document.getElementById('overlay')
  overlay.style.backgroundColor = 'rgba(0,0,0,0.4)'
  overlay.style.display = 'block'
}

function closeNav() {
  document.getElementById('side-menu').style.width = '0'
  document.getElementById("overlay").style.display = 'none'
}

closeNav()