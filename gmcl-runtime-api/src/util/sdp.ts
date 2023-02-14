export function createOfferLauncherUrl(description: string) {
  return `gmcl://peer/offer/${description}`
}

export function createAnswerLauncherUrl(description: string) {
  return `gmcl://peer/answer/${description}`
}

export function createOfferAppUrl(description: string, inviter: string) {
  return `https://gmcl.app/peer?description=${description}?type=offer?inviter=${inviter}`
}

export function createAnswerAppUrl(description: string, inviter: string) {
  return `https://gmcl.app/peer?description=${description}?type=answer?inviter=${inviter}`
}
