interface IGuildChannel {
  id: string;
  name: string;
  type: number;
  topic?: string;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  position: number;
  permission_overwrites?: any[];
  parent_id?: string;
  nsfw: boolean;
  rtc_region?: string | null;
  video_quality_mode?: number;
  default_auto_archive_duration?: number;
  default_reaction_emoji?: any;
  available_tags?: any[];
  default_sort_order?: number;
}
export default IGuildChannel;
