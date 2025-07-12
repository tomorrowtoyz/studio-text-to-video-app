from lightning.app import LightningApp, LightningFlow, StaticWebFrontend

class VideoApp(LightningFlow):
    def configure_layout(self):
        return StaticWebFrontend("frontend/dist")

app = LightningApp(VideoApp())