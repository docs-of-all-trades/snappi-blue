import { Button } from "@/components/Button"

const methodColors = {
  GET: "bg-green-500 hover:bg-green-600",
  POST: "bg-purple-500 hover:bg-purple-600",
  PUT: "bg-yellow-500 hover:bg-yellow-600",
  DELETE: "bg-red-500 hover:bg-red-600",
  PATCH: "bg-orange-500 hover:bg-orange-600"
}

function MethodButton({ method }) {
  return (
    <Button 
      className={`text-white font-bold py-1 px-2 rounded ${methodColors[method]}`}
    >
      {method}
    </Button>
  )
}

export default function Component() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Method</th>
            <th className="py-3 px-6 text-left">Description</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">
              <MethodButton method="GET" />
            </td>
            <td className="py-3 px-6 text-left">
              Retrieve information about a resource. It is a read-only operation and does not change the state of the resource.
            </td>
          </tr>
          <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">
              <MethodButton method="POST" />
            </td>
            <td className="py-3 px-6 text-left">
              Create a new resource. It can also be used to trigger operations that don't actually create resources.
            </td>
          </tr>
          <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">
              <MethodButton method="PUT" />
            </td>
            <td className="py-3 px-6 text-left">
              Update an existing resource or create a new resource if it does not exist.
            </td>
          </tr>
          <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">
              <MethodButton method="DELETE" />
            </td>
            <td className="py-3 px-6 text-left">
              Remove a REST API resource.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}