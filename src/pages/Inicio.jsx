export default function Inicio() {
  return (
    <div className="container-page">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Sistema de Denuncias Online</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Plataforma segura para realizar denuncias de manera rápida y eficiente. 
          Tu seguridad es nuestra prioridad.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="card text-center">
            <div className="text-4xl mb-4">🚨</div>
            <h3 className="text-lg font-semibold mb-2">Denuncias Rápidas</h3>
            <p className="text-gray-600">Realiza tu denuncia de forma sencilla y segura</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold mb-2">Datos Protegidos</h3>
            <p className="text-gray-600">Tus datos están seguros y protegidos</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Respuesta Rápida</h3>
            <p className="text-gray-600">Procesamiento eficiente de tu denuncia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
