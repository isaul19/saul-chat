# Integrar la api de OPENAI a un proyecto React

## Requisitos

- [Nodejs 16.8+](https://nodejs.org/es)
- [Amplify CLI](https://docs.amplify.aws/cli/)

## Obtener la KEY de OPENAI

Como primer paso creemos una [API_KEY](https://platform.openai.com/account/api-keys). Si no agregaste una tarjeta no funcionará tu key [AGREGAR METODO DE PAGO](https://platform.openai.com/account/billing/payment-methods), no te preocupes si temes gastar más de lo pensado puedes configurar para que maximo openai pueda usar 1 dolar de tu tarjeta al mes: [CONFIGURAR LIMITES](https://platform.openai.com/account/billing/limits).

## Agregar Amplify al proyecto

Inicializamos el proyecto com amplify

```
amplify init
```

Primero, te pedirá como quieres que se llame tú proyecto en aws-amplify

```
Enter a name for the project: xxxxxxxxxx
```

Segundo, amplify te dará una configuración ya establecida,amplify reconoce muy bien react, asi que le daremos "Y" (que aceptamos su configuracion por defecto).

```
Project information
| Name: xxxxxxxxxx
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: react
| Source Directory Path: src
| Distribution Directory Path: build
| Build Command: npm run-script build
| Start Command: npm run-script start

? Initialize the project with the above configuration? (Y/n) Y
```

Tercero, ahora te pedirá autenticarte para que pueda acceder a aws, te dejaré un link por si no posees [CLAVES DE ACCESO](https://us-east-1.console.aws.amazon.com/iamv2/home#/security_credentials)

En nuestro proyecto se agregó el directorio **`amplify/`**, no hay problema al subirlo a un repositorio, **`.gitignore`** se actualizó agregando archivos de aws sensibles para que sean ignorados.

## Creando un API con API_GATEWAY

Primero, creamos la api

```
amplify add api
```

- Seleciona la opción REST.

- Dale un nombre al recurso, ejemplo: "openai".

- Dale un nombre al path, ejemplo: "/gpt".

- Dale un nombre a la funcion que se activará cuando se haga una petición http al path "/gpt", ejemplo: "gptFuncion".

- Selecciona el lenguaje que usará tu lambda, ejemplo: "Nodejs"

- Selecciona que tipo de template deseas, esto solo cambia la cantidad de codigo con la que tu lambda inicia, iremos por el template con menos codigo: "Hello World".

- Do you want to configure advanced settings? No `(Todavia no configurarenos las variables de entorno)`

- Do you want to edit the local lambda function now? Yes

- Restrict API access? No `(Como es una prueba no lo usaré, pero puedes integrar las lambdas con aws cognito para que solo tú app pueda usar las lambdas)`

- Do you want to add another path? (y/N): N `No agregaremos otro endpoints, a no ser que quieras varios modelos`

Listo, ahora dirigete a **`amplify/backend/function`**, aqui encontrarás todas tus lambdas, dirigete a la tuya, entra en **`src`** y en el **`index.js`** puedes modificar tu lambda, por defecto ahora está el template **`hello-world`**

(Descomentemos los headers)

```
index.js
_____________

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
};

```

Ahora mandemos los cambios que hicimos a amplify

```
amplify push
```

## Obtener los datos de las lambdas

instalemos aws-amplify

```
npm install aws-amplify
```

Primero importaremos las configuraciones de aws en nuestro main.jsx, para poder usar aws en toda la app

```
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

```

Segundo, ahora podremos importar `API`, con el cual podremos hacer peticiones a nuestras lambdas.

```
import { API } from "aws-amplify";

export const gptResponse = (prompt) => {
  const apiName = "openai"; // El nombre que le diste al recurso
  const path = `/gptTurbo`; // El nombre que le diste al path
  const myInit = {
    body: {
      prompt: prompt  // El dato que le enviaras, aunque no es importante ahora,
                        ya que no estamos recibiendolo
    }
  };

  return API.post(apiName, path, myInit);
};
```

haremos una prueba para ver si funciona la implementación,lo haremos en algun componente que se renderizé, ejemplo: `App.jsx`

```
export default function App() {

    console.log(await gptResponse())

    return <div></div>
}
```

si funciona imprimirá en consola "Hello World"
