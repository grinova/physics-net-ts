import { SystemMessage } from '../data/message'
import { Net } from '../net/net'

export class SystemSender {
  private net: Net<SystemMessage>

  constructor(net: Net<SystemMessage>) {
    this.net = net
  }

  send(data: any): void {
    this.net.send({ type: 'system', data })
  }
}
