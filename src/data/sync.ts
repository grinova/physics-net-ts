export interface Point {
  x: number
  y: number
}

export interface BodySyncProps {
  position: Point
  angle: number
  linear: Point
  angular: number
}

export interface DefaultSyncData {
  [id: string]: BodySyncProps
}
