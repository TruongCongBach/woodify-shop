export const getImagesFromMedia = (media: MediaItem[]) => {
	return media.filter(item => item.type === 'image')
}
