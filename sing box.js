const { type, name } = $arguments
const compatible_outbound = {
  tag: 'COMPATIBLE',
  type: 'direct',
}

let compatible
let config = JSON.parse($files[0])
let proxies = await produceArtifact({
  name,
  type: /^1$|col/i.test(type) ? 'collection' : 'subscription',
  platform: 'sing-box',
  produceType: 'internal',
})

config.outbounds.push(...proxies)

config.outbounds.map(i => {
  if (['✈️ 三分机场'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /三分/i))
  }
  if (['✈️ 牛逼机场'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /牛逼/i))
  }
  if (['✈️ FlyingBird'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /FLY/i))
  }
  if (['✈️ 飞鸟云机场'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /飞鸟/i))
  }
  if (['🇭🇰 香港'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /香港/i))
  }
  if (['🇨🇳 台湾'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /台湾/i))
  }
  if (['🇯🇵 日本'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /日本/i))
  }
  if (['🇸🇬 新加坡'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /新加坡/i))
  }
  if (['🌐 其它地区'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^(?!.*(?:香港|台湾|日本|新加坡)).*()/i))
  }
  if (['chatgpt'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^(?!.*(?:Fly 香港|Fly 新加坡|Fly 台湾|美国|英国|土耳其|阿根廷|三分|牛逼 新加坡|牛逼 日本|牛逼 韩国|牛逼 台湾|加拿大|飞鸟 新加坡|飞鸟 日本|飞鸟 香港)).*()/i))
  }
})

config.outbounds.forEach(outbound => {
  if (Array.isArray(outbound.outbounds) && outbound.outbounds.length === 0) {
    if (!compatible) {
      config.outbounds.push(compatible_outbound)
      compatible = true
    }
    outbound.outbounds.push(compatible_outbound.tag);
  }
});

$content = JSON.stringify(config, null, 2)

function getTags(proxies, regex) {
  return (regex ? proxies.filter(p => regex.test(p.tag)) : proxies).map(p => p.tag)
}