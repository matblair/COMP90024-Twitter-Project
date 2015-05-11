module DemographicParser
	extend ActiveSupport::Concern

	ALLOWED_MARKERS = ['political_leaning', 'language','visitor']

	def extract_demographic params
		if params.has_key? 'demographic_markers'
			# Extract demographic and check that it has valid options
			demo = params['demographic_markers']
			# Remove any keys not valid and return
			demo.delete_if {|k,v| not ALLOWED_MARKERS.include? k }
			return demo
		else
			return nil
		end
	end

end