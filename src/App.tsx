import Wall from "./components/Wall"

function App() {

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Sticky Notes Wall</h1>
        <Wall />
      </div>
    </>
  )
}

export default App