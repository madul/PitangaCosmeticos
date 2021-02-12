import React from 'react';
import './Footer.css';

export default function Footer(props){
    return(
      <footer className="footer">
        <div id="formas_pagamento">
            <p>Formas de Pagamento</p>
            <img id="img_formas_pagamento" src={require(`../../images/formas_pagamento.jpg`).default} alt="Formas de pagamento" width="300px"/>
        </div>
        <div id="recode">
            <p>&copy; Recode Pro / Maria Eduarda Leme</p>
        </div>
      </footer>
    );
}

