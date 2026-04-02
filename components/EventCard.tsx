import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const PLACEHOLDER_EVENT_IMG = "/images/event-bg-1.png";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  venue: string;
  image?: string;
  category: string;
  status: "upcoming" | "past" | "ongoing";
  registrationLink?: string;
}

export default function EventCard({
  title,
  description,
  date,
  venue,
  image,
  category,
  status,
  registrationLink,
}: EventCardProps) {
  const safeImage = (typeof image === "string" && image.trim().length > 0) ? image : null;
  const imgSrc = safeImage || PLACEHOLDER_EVENT_IMG;

  let formattedDate = date;
  try {
    formattedDate = new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    // keep original date string
  }

  return (
    <div
      className="event-card"
      id={`event-card-${(title || "").replace(/\s/g, "-").toLowerCase()}`}
    >
      <div className="event-card__image-wrapper">
        {imgSrc && imgSrc.length > 0 ? (
          <Image
            src={imgSrc}
            alt={title || "Event"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="event-card__image"
          />
        ) : (
          <div className="event-card__image" style={{ backgroundColor: 'var(--bg-secondary)' }} />
        )}
        <div className="event-card__overlay" />
        <div className="event-card__badges">
          <span className="event-card__category">{category}</span>
          <span
            className={`event-card__status event-card__status--${status}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>

      <div className="event-card__content">
        <h3 className="event-card__title">{title}</h3>
        <p className="event-card__description">{description}</p>

        <div className="event-card__meta">
          <div className="event-card__meta-item">
            <Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
          <div className="event-card__meta-item">
            <MapPin size={16} />
            <span>{venue}</span>
          </div>
        </div>

        {status === "upcoming" && (
          <a
            href={registrationLink || "#"}
            className="event-card__cta"
          >
            Register Now <ArrowRight size={16} />
          </a>
        )}
      </div>
    </div>
  );
}
