import { useEffect } from "react"
import { App, Debug, Image, MoveEvent, Rect, ZoomEvent } from 'leafer-ui'

import '@leafer-in/editor'
import '@leafer-in/view'
import '@leafer-in/state'
// @ts-ignore
import { Ruler } from 'leafer-x-ruler';
import { ScrollBar } from '@leafer-in/scroll';

// Debug.enable = true

export default function View({ target }: { target: HTMLElement }) {
  useEffect(() => {
    const app = new App({
      view: target,
      fill: "#f2f2f2",

      editor: {
        rotatePoint: {
          fill: 'rgba(0, 102, 255, 0.5)',
        },
        middlePoint: { width: 16, height: 6, cornerRadius: 3 },
        buttonsDirection: 'top'
      }
    });

    app.frame = app.addLeafer({ type: 'draw', hittable: false });

    app.tree.zoom({
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
    });

    app.frame.zoom({
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
    });

    const mask = new Rect({
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
      fill: 'black',
      mask: true
    });

    app.tree.add(mask);

    const rect = new Rect({
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
      fill: '#32cd79',
      editable: true,
    })
    app.tree.add(rect);

    new ScrollBar(app);
    const ruler = new Ruler(app);

    ruler.addTheme('dark2', {
      backgroundColor: '#16161a',
      textColor: 'rgba(255, 255, 255, 0.5)',
      borderColor: '#686868',
      highlightColor: 'rgba(0, 102, 255, 0.5)',
    });

    const image = new Image({
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
      url: '/mask.svg',
      editable: false,
      hittable: false,
      hitSelf: false,
    });

    // 假如取消注释，会导致rect旋转出现问题
    // app.frame.add(image);

    app.on(MoveEvent.BEFORE_MOVE, function (e: MoveEvent) {
      app.frame.moveWorld(e.moveX, e.moveY)
    })

    app.on(ZoomEvent.BEFORE_ZOOM, function (e: ZoomEvent) {
      const center = { x: e.x, y: e.y }
      app.frame.scaleOfWorld(center, e.scale)
    })

    return () => {
      app.destroy();
    }
  }, [target])

  return (
    <>
    </>
  )
}