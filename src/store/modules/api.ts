import { defineStore } from 'pinia'
import { set } from 'lodash-es'
import {
  ApiKeyName,
  ApiConfig,
  ApiDataConfig,
  ApiType,
  ApiRequestMethod,
} from '@/components/dataSource/data-source'
import { isUrl, toJson, replaceTextParams } from '@/utils/util'
import { axiosInstance, request } from '@/network/axios'

import { useEventStore } from './event'

export interface IApiState {
  dataMap: {
    [k: string]: {
      [k in ApiKeyName]?: any
    }
  }
}

export const useApiStore = defineStore('api', {
  state: (): IApiState => ({
    dataMap: {},
  }),
  actions: {
    async setData(comId: string, apiKey: ApiKeyName, data: any) {
      set(this.dataMap, `${comId}.${apiKey}`, data)
    },
    async requestData(comId: string, aConfig: ApiConfig, adConfig: ApiDataConfig) {
      const eventStore = useEventStore()
      const { type, config } = adConfig
      let res: unknown
      console.log(type)

      if (type === ApiType.static) {
        res = config.data
      } else if (type === ApiType.api) {
        if (!config.api) {
          return []
        }

        if (!isUrl(config.api)) {
          throw Error('url must contains protocol field, like http:')
        }

        try {
          const conf = {
            headers: toJson(config.apiHeaders, {}),
            withCredentials: config.cookie,
          }

          const url = replaceTextParams(config.api, eventStore.variables)
          if (config.apiMethod === ApiRequestMethod.GET) {
            res = await request(url, {
              method: 'GET',
              ...conf,
            })
          } else {
            res = await axiosInstance.post(url, toJson(config.apiBody, {}), {
              ...conf,
            })
          }
        } catch {
          throw Error('connectFailed')
        }
      }

      return toJson(res, [])
    },
  },
})
