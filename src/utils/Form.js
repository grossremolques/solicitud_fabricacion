const Form = () => {
  const view = `
    <h1>SOLICITUD DE FABRICACIÓN</h1>
      <form>
        <div class="form-item">
          <label for="solicita">Solicita</label>
          <input type="text" name="solicita" title="solicita" />
        </div>
        <div class="form-item form-item--input">
          <label for="solicita">Sector</label>
          <select title="sector" name="sector" required>
            <option value="">Seleccione un sector</option>
          </select>
        </div>
        <div class="form-item">
          <label for="codigo">Código</label>
          <div class="form-item--group">
            <input type="search" name="codigo" title="codigo" required/>
            <button type="button" title="search" id="search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Outline"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path
                  d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="form-item form-item--input">
          <label for="descripcion">Descripción</label>
          <textarea name="descripcion" title="descripcion"rows="3" readonly required></textarea>
        </div>
        <div class="row">
          <div class="form-item">
            <label for="cantidad">Cantidad</label>
            <input type="number" name="cantidad" min="1" title="cantidad" required/>
          </div>
          <div class="form-item">
            <label for="reproceso">¿Reproceso?</label>
            <select title="reproceso" name="reproceso" required>
              <option value=""></option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
          <div class="form-item">
            <label for="etiqueta">¿Etiqueta?</label>
            <select title="etiqueta" name="etiqueta" required>
              <option value=""></option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        <button type="button" title="submit" id="submit" disabled>Enviar</button>
      </form>
    `;
    return view
};
export default Form
