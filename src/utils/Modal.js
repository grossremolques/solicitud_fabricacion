class Modal {
  constructor({ title, content, hasButtons }) {
    (this.title = title),
      (this.content = content),
      (this.hasButtons = hasButtons),
      (this.showButtons = hasButtons ? "active" : "disabled"),
      (this.modalDOM = document.getElementById("modal"));
  }
  renderModal() {
    const view = `
        <div class="card-modal">
            <h3>${this.title}</h3>
            <p>${this.content}</p>
            <div class="buttons disabled">
                <button type="button" title="aceptar">Aceptar</button>
                <button type="button" title="cerrar"> Cerrar</button>
            </div>
        </div>
        `;
    return view;
  }
  openModal() {
    this.modalDOM.classList.remove("modal--hidde");
    this.modalDOM.innerHTML = this.renderModal();
  }
  closeModal() {
    this.modalDOM.classList.add("modal--hidde");
  }
}
export default Modal;
