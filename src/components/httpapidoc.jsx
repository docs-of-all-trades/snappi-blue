
import { useState } from "react"
import { HTTP } from "../components/http"
import { Tabs, Tab } from "../components/tabbar" 

import cn from "classnames"


import {ChevronrightIcon as ChevronRight} from "./icons/ChevronrightIcon"


export const getColorClassName = (method) => {
  switch (method) {
    case "GET": return "bg-green-100 text-green-600"
    case "HEAD": return "bg-fuchsia-100 text-fuchsia-600"
    case "POST": return "bg-sky-100 text-sky-600"
    case "PUT": return "bg-amber-100 text-amber-600"
    case "DELETE": return "bg-rose-100 text-rose-600"
    case "CONNECT": return "bg-violet-100 text-violet-600"
    case "OPTIONS": return "bg-neutral-100 text-neutral-600"
    case "TRACE": return "bg-indigo-100 text-indigo-600"
    case "PATCH": return "bg-orange-100 text-orange-600"
  }
}

export const getResponseColorClassName = (code) => {
  if (code < 300) {
    return "bg-green-500"
  } else if (code < 400) {
    return "bg-orange-500"
  } else {
    return "bg-rose-500"
  }
}

export const ResponseTag = ({ code }) => {
  return <div className="not-prose flex flex-row gap-2 items-center">
      <div className={`${getResponseColorClassName(code)} rounded-full w-2 h-2`}/>
      <p className="font-medium">{code}: {HTTPResponseCodes[code]}</p>
    </div>
}

export const Badge = ({ method }) => {
  return <span className={`${getColorClassName(method)} font-medium rounded-full px-2 py-1 text-xs w-min select-none`}>{ method }</span>
}

export const ObjectTypeFormatter = ({ typeinfo }) => {
  return <div className="mt-4 overflow-x-auto flex flex-col gap-2 divide-y divide-neutral-100">
    {typeinfo && Object.keys(typeinfo).map(k => {
      let example
      if (typeof typeinfo[k]?.example === "object") {
        example = <div>
            <p className="mb-2">Example:</p>
            <div className="bg-neutral-50 p-2 rounded-md font-mono text-xs whitespace-pre-wrap">
              {JSON.stringify(typeinfo[k]?.example, null, 2)}</div>
          </div>
      } else {
        example = <p className="mb-2">
            Example:
            <span className="font-mono ml-1 text-xs">{typeinfo[k]?.example}</span>
          </p>
      }
      return <div>
          <div className="py-2">
            <span className="font-mono text-xs">{ k }</span>
            <span className="ml-1 font-semibold">{ typeinfo[k]?.type }</span>
          </div>
          {typeinfo[k]?.example && <div>
              {example}
              </div>
          }
        </div>
    })}
  </div>
}

export const TypeFormatter = ({ type, typeinfo }) => {
  const [isOpen, setOpen] = useState(false)
  if (type === "array") {
    let description
    if (typeinfo?.type === "object") {
      description = <>
          <div className="-mb-2">
            Each item is an <span className="font-semibold">object</span> with fields:
          </div>
          <ObjectTypeFormatter typeinfo={typeinfo.properties} />
        </>
    } else if (typeinfo) {
      description = <>
          <div>
            Each item is of type{' '}
            <span className="font-semibold">{typeinfo.type}</span>.
          </div>
          {
            typeinfo.enum && <p>
                Accepted values:{' '}
                <span className="font-mono text-xs">{JSON.stringify(typeinfo.enum)}</span>
              </p>
          }
        </>
    }
    return <div>
        <div className="w-min flex flex-row items-center cursor-pointer hover:opacity-80" onClick={() => setOpen(o => !o)}>
          <p className="font-semibold">array</p>
          { description &&
            <div className="flex flex-row items-center whitespace-nowrap mt-0.5 ml-2 text-xs border rounded-full px-2 bg-neutral-50 text-neutral-500 transition">
              { isOpen ? "Hide items" : "Show items"}
            </div>
          }
        </div>
        { isOpen && <div>
          <div className="mt-4">
            { description }
          </div>
        </div>}
      </div>
  } else if (type === "object") {
    return <div>
        <div className="w-min flex flex-row items-center cursor-pointer hover:opacity-80" onClick={() => setOpen(o => !o)}>
          <p className="font-semibold">object</p>
          { typeinfo &&
            <div className="flex flex-row items-center whitespace-nowrap mt-0.5 ml-2 text-xs border rounded-full px-2 bg-neutral-50 text-neutral-500 transition">
              { isOpen ? "Hide fields" : "Show fields"}
            </div>
          }
        </div>
        { isOpen && <ObjectTypeFormatter typeinfo={typeinfo} />}
      </div>
  }
  return <p className="font-semibold">{ type }</p>
}

export const ParamsTable = ({ params }) => {
  return <table className="w-full text-sm table-auto prose border-collapse min-w-full m-0">
      <tbody>
        { params.map(p => {
          return <tr className="border-b border-neutral-100">
              <td className="w-48 py-2 font-mono align-top text-sm">
                {p.name}{p.required && <span className="text-rose-500 text-xs ml-0.5 transform -translate-y-1 inline-block select-none">*</span>}
              </td>
              {p.type &&
                <td className="w-48 py-2 align-top max-w-[200px] overflow-x-auto">
                  <TypeFormatter type={p.type} typeinfo={p.typeinfo} />
                </td>
              }
              {p.description &&
                <td className="py-2 align-top">
                  {p.description}
                </td>
              }
            </tr>
        })}
      </tbody>
    </table>
}

export const getRequestBodyExample = (props) => {
  const example = Object.keys(props).reduce((acc, value) => {
    return {
      ...acc,
      [value]: props[value]?.example
    }
  }, {})
  if (Object.values(example).filter(Boolean).length === 0) {
    return undefined
  }
  return JSON.stringify(example, null, 2)
}

export const getRequestBodySchema = (props) => {
  const required = props.required || []
  const properties = props.properties || {}
  return Object.keys(properties).reduce((acc, value) => {
    const type = properties[value].type
    let typeinfo = undefined
    if (type === 'array') {
      typeinfo = properties[value].items
    } else if (type === 'object') {
      typeinfo = properties[value].properties
    }
    return [
      ...acc,
      {
        name: value,
        required: required.includes(value),
        type,
        typeinfo,
        description: properties[value].description?.replace("\n", "<br />")
      }]
  }, [])
}

export const RequestBody = ({ requestBody }) => {
  const props = requestBody?.content?.["application/json"]?.schema
  if (!props) {
    return <p className="text-neutral-500">No request body.</p>
  }
  const example = getRequestBodyExample(props?.properties)
  return <Tabs>
      { example &&
        <Tab title="Example">
          <div className="mt-2">
            <pre>{example}</pre>
          </div>
        </Tab>
      }
      <Tab title="Schema" className="pt-4">
        <ParamsTable params={getRequestBodySchema(props)} />
      </Tab>
    </Tabs>
}

export const RevealButton = ({ open, className, onClick }) => {
  return <div onClick={onClick} className={`${className} p-1 rounded-md hover:bg-neutral-100 transition cursor-pointer`}><ChevronRight className={cn(
      "w-6 h-6 text-neutral-600 transform transition", {
        "rotate-0": !open,
        "rotate-90": open,
      }
    )} /></div>
}

export const HTTPAPIDoc = ({ method, baseUrl, path, description, parameters, responses, requestBody, isOpen: _isOpen }) => {
  const [isOpen, setOpen] = useState(_isOpen)
  const queryParams = parameters?.filter(p => p.in === "query")
  const pathParams = parameters?.filter(p => p.in === "path")
  const formDataParams = parameters?.filter(p => p.in === "formData")
  const bodyParams = parameters?.filter(p => p.in === "body")

  return <div className="pl-12 pr-6 pt-4 pb-4 rounded-md bg-white border border-neutral-200 flex flex-col gap-2 overflow-hidden not-prose">
    <div className="relative flex flex-row gap-4 items-center m-0 not-prose">
      <RevealButton
        className="absolute left-[-38px]"
        open={isOpen}
        onClick={() => setOpen(o => !o)}
      />
      <Badge method={method} />
      <p className="text-sm"><span className="text-neutral-400">{baseUrl || ''}</span><span className="font-medium text-neutral-900">{path || ''}</span>
      </p>
    </div>
    <p className="m-0 p-0 mt-2">{description}</p>
    { isOpen && <>
      <div>
        <p className="font-semibold mt-4">Parameters</p>
        {!(parameters?.length > 0) && <p className="text-neutral-500">No parameters</p>}
        {queryParams?.length > 0 && <>
            <p className="font-semibold mt-10 text-sm">Query</p>
            <ParamsTable params={queryParams} />
          </>
        }
        {pathParams?.length > 0 && <>
            <p className="font-semibold mt-10 text-sm">Path</p>
            <ParamsTable params={pathParams} />
          </>
        }
        {bodyParams?.length > 0 && <>
            <p className="font-semibold mt-10 text-sm">Body</p>
            <ParamsTable params={bodyParams} />
          </>
        }
        {formDataParams?.length > 0 && <>
            <p className="font-semibold mt-10 text-sm">Form data</p>
            <ParamsTable params={formDataParams} />
          </>
        }
      </div>
      {requestBody && Object.keys(requestBody)?.length > 0 &&
        <>
          <p className="font-semibold mt-10 text-sm">Body</p>
          <RequestBody requestBody={requestBody} />
        </>
      }
      {responses && Object.keys(responses)?.length > 0 &&
        <>
          <p className="font-semibold mt-4 m-0 p-0">Responses</p>
          <table className="w-full text-sm table-auto prose border-collapse min-w-full m-0">
            <tbody>
              { Object.keys(responses).map(code => {
                return <tr className="border-b border-neutral-100">
                    <td className="w-48 py-2 align-top">
                      <ResponseTag code={code} />
                    </td>
                    <td className="py-2 align-top">
                      <p dangerouslySetInnerHTML={{
                          __html: responses[code]?.description?.replace(/\n/gi, "")
                        }} />
                    </td>
                  </tr>
              })}
            </tbody>
          </table>
        </>
      }
      </>
    }
  </div>
}

<div className="prose p-8 max-w-full">
<HTTPAPIDoc
  isOpen
  method="GET"
  baseUrl="http://api.example.com"
  responses={[]}
  path="/greet"
  description="Greet the user."
  responses={{
    "400": { "description": "Invalid ID supplied" },
    "404": { "description": "Pet not found" },
    "405": { "description": "Bad request\n<table>\n  <tr>\n    <td>Message</td>\n    <td>Cause</td>\n  </tr>\n  <tr>\n    <td>Booking body is invalid</td>\n    <td>Missing property on booking entity.</td>\n  </tr>\n  <tr>\n    <td>Invalid eventTypeId</td>\n    <td>The provided eventTypeId does not exist.</td>\n  </tr>\n  <tr>\n    <td>Missing recurringCount</td>\n    <td>The eventType is recurring, and no recurringCount was passed.</td>\n  </tr>\n  <tr>\n    <td>Invalid recurringCount</td>\n    <td>The provided recurringCount is greater than the eventType recurring config</td>\n  </tr>\n</table>\n" }
  }}
  requestBody={{
    "description": "Create a new attendee related to one of your bookings",
    "required": true,
    "content": {
      "application/json": {
        "schema": {
          "type": "object",
          "required": ["bookingId", "name", "email"],
          "properties": {
            "bookingId": { "type": "number", "example": 1, "description": "The booking id" },
            "email": { "type": "string", "example": "email@example.com" },
            "name": { "type": "string", "example": "John Doe" },
            "timeZone": { "type": "string", "example": "Europe/London" },
            "attendees": {
              "type": "array",
              "description": "List of attendees of the booking",
              "items": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "email": { "type": "string", "format": "email" },
                  "timeZone": { "type": "string" },
                  "locale": { "type": "string" }
                }
              }
            },
            "days": {
              "type": "array",
              "description": "Array of integers depicting weekdays",
              "items": { "type": "integer", "enum": [0, 1, 2, 3, 4, 5] }
            },
            "schema": {
              "type": "object",
              "required": ["title", "slug", "length", "metadata"],
              "properties": {
                "length": { "type": "number", "example": 30 },
                "metadata": {
                  "type": "object",
                  "example": {
                    "smartContractAddress": "0x1234567890123456789012345678901234567890"
                  }
                },
                "title": { "type": "string", "example": "My Event" },
                "slug": { "type": "string", "example": "my-event" }
              }
            }
          }
        }
      }
    }
  }}
/>
</div>