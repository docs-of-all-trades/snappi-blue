import { useEffect, useState } from "react"

import { HTTPAPIDoc } from "../components/httpapidoc"

export const OpenAPIDoc = ({ url, path, method }) => {
  const [spec, setSpec] = useState(undefined)
  
  useEffect(() => {
    if (!url || !path) {
      return
    }
    const run = async () => {
      const response = await fetch(url)
      const result = await response.json()
      if (!result) {
        return
      }
      
      const baseUrl = `${result.schemes?.[0]}://${result.host}${result.basePath}`
      const spec = result.paths?.[path]?.[method.toLowerCase()]
      if (!spec) {
        return
      }
      setSpec({
        baseUrl,
        description: spec?.summary || spec?.description,
        parameters: spec?.parameters,
        responses: spec?.responses || {},
      })
    }
    run()
  }, [url, path])

return <HTTPAPIDoc
    method={method}
    baseUrl={spec?.baseUrl}
    path={path}
    description={spec?.description}
    parameters={spec?.parameters}
    responses={spec?.responses} />

}
