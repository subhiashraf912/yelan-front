import React, { useEffect, useState, useRef, useCallback } from "react";
import ElementSettings from "./ElementSettings";
import {
  CanvasTextElement,
  IWelcomeScreenSettings,
} from "@/types/Welcomer/IWelcomeScreenSettings";
interface CanvasEditorProps {
  settings: IWelcomeScreenSettings;
  onSave: (newSettings: IWelcomeScreenSettings) => void;
}
type WelcomeScreenSettingsWithoutBackground = Omit<
  IWelcomeScreenSettings,
  | "guildId"
  | "width"
  | "height"
  | "backgroundColor"
  | "backgroundImageUrl"
  | "stroke"
  | "overlay"
>;

const CanvasEditor: React.FC<CanvasEditorProps> = ({ settings, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [localSettings, setLocalSettings] =
    useState<IWelcomeScreenSettings>(settings);
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [avatarImage, setAvatarImage] = useState<HTMLImageElement | null>(null);

  const [dragging, setDragging] = useState<boolean>(false);
  const [lastMousePosition, setLastMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const drawText = useCallback(
    (textSettings: CanvasTextElement, textContent: string) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = textSettings.color;
      ctx.textAlign = (textSettings.align || "center") as CanvasTextAlign;
      ctx.font = `${textSettings.size}px ${textSettings.font}`;
      ctx.shadowColor = textSettings.shadow.shadowColor || "black";
      ctx.shadowBlur = textSettings.shadow.shadowBlur || 5;
      ctx.shadowOffsetX = textSettings.shadow.shadowOffsetX || 2;
      ctx.shadowOffsetY = textSettings.shadow.shadowOffsetY || 2;
      ctx.fillText(
        textSettings.text
          .replace("{username}", "Xyris")
          .replace("{server}", "Senria"),
        textSettings.x,
        textSettings.y
      );
    },
    []
  );
  const loadImageAsync = useCallback((url: string): void => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setBackgroundImage(img);
    };
    img.onerror = (error) => {
      console.error("Error loading image:", error);
    };
  }, []);

  const loadAvatarImageAsync = useCallback((url: string): void => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setAvatarImage(img);
    };
    img.onerror = (error) => {
      console.error("Error loading avatar image:", error);
    };
  }, []);

  useEffect(() => {
    if (settings.backgroundImageUrl && settings.backgroundImageUrl !== "") {
      loadImageAsync(settings.backgroundImageUrl);
    } else {
      setBackgroundImage(null);
    }
  }, [settings.backgroundImageUrl, loadImageAsync]);
  useEffect(() => {
    const avatarLink =
      "https://cdn.discordapp.com/avatars/507684120739184640/fe23be737e3f33ddae2537b69101e1fe.webp?size=4096";
    if (avatarLink) {
      loadAvatarImageAsync(avatarLink);
    } else {
      setAvatarImage(null);
    }
  }, [loadAvatarImageAsync]);

  const drawCanvas = async () => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, settings.width, settings.height);

    // // Background color
    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, settings.width, settings.height);

    // background image
    if (
      settings.backgroundImageUrl &&
      settings.backgroundImageUrl !== "" &&
      backgroundImage
    ) {
      const aspectRatio = backgroundImage.width / backgroundImage.height;
      const canvasAspectRatio = settings.width / settings.height;

      let sourceWidth;
      let sourceHeight;
      let sourceX;
      let sourceY;

      if (aspectRatio > canvasAspectRatio) {
        // image is wider than canvas
        sourceWidth = backgroundImage.height * canvasAspectRatio;
        sourceHeight = backgroundImage.height;
        sourceX = (backgroundImage.width - sourceWidth) / 2;
        sourceY = 0;
      } else {
        // image is taller than canvas
        sourceWidth = backgroundImage.width;
        sourceHeight = backgroundImage.width / canvasAspectRatio;
        sourceX = 0;
        sourceY = (backgroundImage.height - sourceHeight) / 3;
      }

      ctx.drawImage(
        backgroundImage,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        settings.width,
        settings.height
      );
    }

    if (
      settings.backgroundImageUrl &&
      settings.overlay?.opacity &&
      settings.overlay.margin
    ) {
      ctx.save();
      ctx.fillStyle = `rgba(0, 0, 0, ${settings.overlay.opacity})`;
      ctx.fillRect(
        settings.overlay.margin,
        settings.overlay.margin,
        settings.width - settings.overlay.margin - settings.overlay.margin,
        settings.height - settings.overlay.margin - settings.overlay.margin
      );
      ctx.restore();
    }

    // Draw the avatar image as a circle.
    if (avatarImage) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        settings.avatar.x,
        settings.avatar.y,
        settings.avatar.radius,
        0,
        Math.PI * 2,
        true
      );
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(
        avatarImage,
        settings.avatar.x - settings.avatar.radius,
        settings.avatar.y - settings.avatar.radius,
        settings.avatar.radius * 2,
        settings.avatar.radius * 2
      );
      ctx.restore();

      if (settings.avatar.stroke) {
        // Draw a circle around the avatar.
        ctx.beginPath();
        ctx.arc(
          settings.avatar.x,
          settings.avatar.y,
          settings.avatar.radius + 2,
          0,
          Math.PI * 2,
          true
        );
        ctx.lineWidth = settings.avatar.stroke.width || 2;
        ctx.strokeStyle = settings.avatar.stroke.color || "white";
        ctx.stroke();
      }
    }

    // Draw the status circle
    ctx.beginPath();
    ctx.arc(
      settings.statusCircle.x,
      settings.statusCircle.y,
      settings.statusCircle.radius,
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();
    const statusColors = {
      online: "#43b581",
      idle: "#faa61a",
      dnd: "#f04747",
      offline: "#747f8d",
      invisible: "#747f8d",
    };
    const memberStatus = "online";
    const statusColor: string = statusColors[memberStatus];
    ctx.fillStyle = statusColor;
    ctx.fill();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#f4d03f";
    ctx.fill();
    ctx.globalAlpha = 1;

    // Draw welcome text
    drawText(settings.welcomeText, settings.welcomeText.text);

    // Draw subtitle text
    drawText(settings.subtitleText, settings.subtitleText.text);

    // Draw member count text
    drawText(settings.memberCountText, settings.memberCountText.text);
    // Draw element outline
    drawElementOutline();
  };

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas, localSettings]);
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const isInsideText = (
    textSettings: {
      x: number;
      y: number;
      size: number;
      font: string;
      text: string;
      align: string;
    },
    x: number,
    y: number
  ) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return false;

    const textMetrics = ctx.measureText(textSettings.text);

    // Padding around the text bounding box
    const padding = 10;

    let startX, endX;

    if (textSettings.align === "center") {
      startX = textSettings.x - textMetrics.width / 2 - padding;
      endX = textSettings.x + textMetrics.width / 2 + padding;
    } else if (textSettings.align === "right") {
      startX = textSettings.x - textMetrics.width - padding;
      endX = textSettings.x + padding;
    } else {
      // Default is "left" alignment
      startX = textSettings.x - padding;
      endX = textSettings.x + textMetrics.width + padding;
    }

    return (
      x >= startX &&
      x <= endX &&
      y >= textSettings.y - textSettings.size - padding &&
      y <= textSettings.y + padding
    );
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const isInsideAvatar =
      Math.sqrt(
        Math.pow(x - localSettings.avatar.x, 2) +
          Math.pow(y - localSettings.avatar.y, 2)
      ) <= localSettings.avatar.radius;
    const isInsideStatusCircle =
      Math.sqrt(
        Math.pow(x - localSettings.statusCircle.x, 2) +
          Math.pow(y - localSettings.statusCircle.y, 2)
      ) <= localSettings.statusCircle.radius;

    if (isInsideAvatar) {
      setSelectedElement("avatar");
    } else if (isInsideStatusCircle) {
      setSelectedElement("statusCircle");
    } else if (isInsideText(localSettings.welcomeText, x, y)) {
      setSelectedElement("welcomeText");
    } else if (isInsideText(localSettings.subtitleText, x, y)) {
      setSelectedElement("subtitleText");
    } else if (isInsideText(localSettings.memberCountText, x, y)) {
      setSelectedElement("memberCountText");
    } else {
      setSelectedElement(null);
    }
  };

  const handleElementSettingsChange = (key: string, value: any) => {
    if (!selectedElement) return;

    setLocalSettings((prevState) => ({
      ...prevState,
      [selectedElement as keyof WelcomeScreenSettingsWithoutBackground]: {
        ...prevState[
          selectedElement as keyof WelcomeScreenSettingsWithoutBackground
        ],
        [key]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    onSave(localSettings);
  };

  const drawElementOutline = () => {
    if (!selectedElement || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.lineWidth = 1;

    if (selectedElement === "avatar" || selectedElement === "statusCircle") {
      const element =
        localSettings[
          selectedElement as keyof {
            avatar: WelcomeScreenSettingsWithoutBackground["avatar"];
          }
        ];
      ctx.beginPath();
      ctx.arc(element.x, element.y, element.radius + 5, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      const textSettings = localSettings[
        selectedElement as keyof WelcomeScreenSettingsWithoutBackground
      ] as CanvasTextElement;
      ctx.font = `${textSettings.size}px ${textSettings.font}`;
      const textMetrics = ctx.measureText(textSettings.text);
      const padding = 10;
      let startX, endX;

      if (textSettings.align === "center") {
        startX = textSettings.x - textMetrics.width / 2 - padding;
        endX = textSettings.x + textMetrics.width / 2 + padding;
      } else if (textSettings.align === "right") {
        startX = textSettings.x - textMetrics.width - padding;
        endX = textSettings.x + padding;
      } else {
        startX = textSettings.x - padding;
        endX = textSettings.x + textMetrics.width + padding;
      }

      ctx.strokeRect(
        startX,
        textSettings.y - textSettings.size - padding,
        endX - startX,
        textSettings.size + padding * 2
      );
    }
  };
  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    handleClick(event);
    setDragging(true);
    console.log("Mouse down");
    setLastMousePosition({ x: event.clientX, y: event.clientY });
    console.log(lastMousePosition);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging || !selectedElement || !lastMousePosition) return;
    console.log("Mouse move");
    const dx = event.clientX - lastMousePosition.x;
    const dy = event.clientY - lastMousePosition.y;

    setLocalSettings((prevState) => {
      const updatedElement = [
        "welcomeText",
        "subtitleText",
        "memberCountText",
      ].includes(selectedElement)
        ? {
            ...prevState[
              selectedElement as keyof WelcomeScreenSettingsWithoutBackground
            ],
            x:
              prevState[
                selectedElement as keyof WelcomeScreenSettingsWithoutBackground
              ].x + dx,
            y:
              prevState[
                selectedElement as keyof WelcomeScreenSettingsWithoutBackground
              ].y + dy,
          }
        : {
            ...prevState[
              selectedElement as keyof WelcomeScreenSettingsWithoutBackground
            ],
            x:
              prevState[
                selectedElement as keyof WelcomeScreenSettingsWithoutBackground
              ].x + dx,
            y:
              prevState[
                selectedElement as keyof WelcomeScreenSettingsWithoutBackground
              ].y + dy,
          };

      return {
        ...prevState,
        [selectedElement]: updatedElement,
      };
    });

    setLastMousePosition({ x: event.clientX, y: event.clientY });
    drawCanvas();
  };

  const handleMouseUp = () => {
    setDragging(false);
    setLastMousePosition(null);
    console.log("Mouse up");
    handleSaveSettings(); // Save settings after the mouse button is released
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const touch = event.touches[0];
    const simulatedEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });

    handleMouseDown(
      simulatedEvent as unknown as React.MouseEvent<HTMLCanvasElement>
    );
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = event.touches[0];
    const simulatedEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });

    handleMouseMove(
      simulatedEvent as unknown as React.MouseEvent<HTMLCanvasElement>
    );
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const simulatedEvent = new MouseEvent("mouseup", {});
    handleMouseUp();
    // handleMouseUp(simulatedEvent as React.MouseEvent<HTMLCanvasElement>);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={settings.width}
        height={settings.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ border: "1px solid #ccc" }}
      ></canvas>
      {selectedElement && (
        <div>
          <h3>{selectedElement} settings:</h3>
          <ElementSettings
            settings={
              localSettings[
                selectedElement as keyof IWelcomeScreenSettings
              ] as Record<string, any>
            }
            onChange={handleElementSettingsChange}
          />
        </div>
      )}
    </>
  );
};

export default CanvasEditor;
