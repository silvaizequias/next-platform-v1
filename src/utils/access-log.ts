import axios from 'axios'

export default async function accessLog(email: string, authorization: string) {
  const systemName = process.env.NEXT_PUBLIC_SYSTEM_NAME as string
  const ip = await (await axios.get('https://api.ipify.org/')).data
  const geolocation = await (
    await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_IP_GEOLOCATION_API_KEY}&ip=${ip}`,
    )
  ).data

  const inputs = {
    email: email,
    ip: geolocation.ip,
    isp: geolocation.isp,
    city: geolocation.city,
    state: geolocation.state_prov,
    country: geolocation.country_code2,
    countryFlag: geolocation.country_flag,
    lat: Number(geolocation.latitude),
    long: Number(geolocation.longitude),
    system: systemName,
  }

  const endpoint = process.env.NEXT_PUBLIC_MANAGER_API + '/access-logs'
  const options = {
    headers: { Authorization: `Bearer ${authorization}` },
  }

  await axios
    .post(endpoint, inputs, options)
    .then(function (response) {
      response.status
    })
    .catch(function (error) {
      console.log(error)
    })
}
